
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const response = await fetch(`${process.env.PAYLOAD_URL}/api/payments?where[table]=${id}`, {
      headers: { Authorization: `Bearer ${process.env.PAYLOAD_TOKEN}` },
    });
    const data = await response.json();
    res.status(200).json(data.docs || []);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}