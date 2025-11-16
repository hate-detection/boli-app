import { NextApiRequest, NextApiResponse } from 'next';
import { getSecretToken, setTokenUsageState } from '@/lib/tokenManager';
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

    const { text } = req.body;
    const cleanedText = text.replace(/[\n\r\t]/gm, "");

    if (cleanedText == "") {
      return res.status(400).json({ message: "Bad Request. text field cannot be empty" })
    }

    const backendUrl = process.env.PREDICT_ENDPOINT as string;
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: JSON.stringify({ text : cleanedText }),                     // removing line breaks and tabs
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_KEY as string,
        'cf-access-client-id': process.env.CLIENT_ID as string,
        'cf-access-client-secret': process.env.CLIENT_SECRET as string,
      },
    });

    // If backend fails, respond with an error
    if (!response.ok) {
      console.log(response.headers)
      console.log(response)
      return res.status(500).json({ message: 'Failed to fetch data from backend' });
    }

    const data = await response.json();
    const prediction = data.label[0];
    let result: { label: string; prediction: number };

    if (data.label.includes(1)) {
      result = { label: 'NON-HATE', prediction: 1 };
    } else if (data.label.includes(0)) {
      result = { label: 'HATE', prediction: 0 };
    } else {
      return res.status(400).json({ message: 'Unexpected label data' });
    }

    // secret-token generation
    const secretToken = getSecretToken();   // get current secret token
    const hash = createHash('sha256');      // create an sha256 hash
    hash.update(text)                       // update the hash with the text
    hash.update(String(prediction))         // add prediction
    hash.update(secretToken)                // add secret token
    const digest = hash.digest('hex');      // create final digest

    res.setHeader('x-secret-token', digest) // send the digest with the headers
    setTokenUsageState(true);               // set the token state to used
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}