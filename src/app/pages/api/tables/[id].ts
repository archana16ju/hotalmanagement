import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const response = await fetch(`${process.env.PAYLOAD_URL}/api/tables/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYLOAD_TOKEN}`, // Secret only here
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}