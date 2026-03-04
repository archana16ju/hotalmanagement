import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { tableId, rating, feedback } = req.body;

  if (!tableId || !rating) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const response = await fetch(`${process.env.PAYLOAD_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYLOAD_TOKEN}`,
      },
      body: JSON.stringify({ table: tableId, rating, feedback }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}