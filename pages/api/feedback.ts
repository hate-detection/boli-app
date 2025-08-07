import { NextApiRequest, NextApiResponse } from 'next';
import { getSecretToken, getTokenUsageState, setTokenUsageState } from '@/lib/tokenManager';
import { createHash } from 'node:crypto';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const requestIp = require('request-ip');
    const clientIp = requestIp.getClientIp(req);
    const requests = await redis.incr(clientIp); // Increment request count
    
    if (requests === 1) {
        await redis.expire(clientIp, 60); // Set expiration to 1 minute
    }

    if (requests > 50) {                  // Only 50 requests per minute       
        return res.status(429).json({ message: 'Rate Limit Exceeded'})
    }

    // secret-token check
    const secretToken = getSecretToken()                      // get current token
    const { text, predicted, feedback, feedtext } = req.body;
    const cleanedText = text.replace(/[\n\r\t]/gm, "");       // removing line breaks and tabs
    const cleanedFeedtext = feedtext.replace(/[\n\r\t]/gm, "");
    const tokenCheck = req.headers['x-secret-token'] as string; // get secret-token from header
    const hash = createHash('sha256');                          // create an sha256 hash
    hash.update(text)                                           // update the hash with text
    hash.update(String(predicted))                              // update with the prediction
    hash.update(secretToken)                                    // update with secretToken
    const digest = hash.digest('hex')                           // create final digest

    if (getTokenUsageState() == true) {                         // if token is used

      if (tokenCheck != digest) {                                 // if the header does not match
        return res.status(403).json({ message: 'Not Authenticated'})  // digest, send 403 error
      }

      const backendUrl: string = process.env.FEEDBACK_ENDPOINT as string;

      const response: Response = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({ text: cleanedText, predicted: predicted, feedback: feedback, feedtext : cleanedFeedtext }),
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_KEY as string,
          'cf-access-client-id': process.env.CLIENT_ID as string,
          'cf-access-client-secret': process.env.CLIENT_SECRET as string,
        },
      });

      // If backend fails, respond with an error
      if (!response.ok) {
        return res.status(500).json({ message: 'Failed to submit feedback' });
      }

      const data: { received: string } = await response.json();
      setTokenUsageState(false);                                                    // set token status as unused

      if (data.received === 'ok') {
        return res.status(200).json({ message: 'Feedback submitted successfully' });
      } else {
        return res.status(400).json({ message: 'Failed to submit feedback' });
      }
    }

    else {
      return res.status(403).json({ message: 'Secret token is invalid' })
    }

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
}