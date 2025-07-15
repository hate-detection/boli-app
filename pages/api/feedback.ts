import { NextApiRequest, NextApiResponse } from 'next';
import { getSecretToken } from '@/lib/tokenManager';
import { createHash } from 'node:crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {

    // secret-token check
    const secretToken = getSecretToken()                      // get current token
    const { text, predicted, feedback, feedtext } = req.body;
    const tokenCheck = req.headers['x-secret-token'] as string; // get secret-token from header
    const hash = createHash('sha256');                          // create an sha256 hash
    hash.update(text)                                           // update the hash with text
    hash.update(String(predicted))                              // update with the prediction
    hash.update(secretToken)                                    // update with secretToken
    const digest = hash.digest('hex')                           // create final digest

    if (tokenCheck != digest) {                                 // if the header does not match
      return res.status(403).json({ message: 'Not Authenticated'})  // digest, send 403 error
    }

    const backendUrl: string = process.env.FEEDBACK_ENDPOINT as string;

    const response: Response = await fetch(backendUrl, {
      method: 'POST',
      body: JSON.stringify({ text, predicted, feedback, feedtext }),
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

    if (data.received === 'ok') {
      return res.status(200).json({ message: 'Feedback submitted successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to submit feedback' });
    }

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
}