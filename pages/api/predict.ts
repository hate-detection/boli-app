import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { text } = req.body;

    const backendUrl = process.env.PREDICT_ENDPOINT as string;
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_KEY as string,
        'cf-access-client-id': process.env.CLIENT_ID as string,
        'cf-access-client-secret': process.env.CLIENT_SECRET as string,
      },
    });

    // If backend fails, respond with an error
    if (!response.ok) {
      return res.status(500).json({ message: 'Failed to fetch data from backend' });
    }

    const data = await response.json();
    let result: { label: string; prediction: number };

    if (data.label.includes(1)) {
      result = { label: 'NON-HATE', prediction: 1 };
    } else if (data.label.includes(0)) {
      result = { label: 'HATE', prediction: 0 };
    } else {
      return res.status(400).json({ message: 'Unexpected label data' });
    }

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
}