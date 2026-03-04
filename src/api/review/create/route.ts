import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { tableId, rating, feedback } = body

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PAYLOAD_SECRET}`,
    },
    body: JSON.stringify({ table: tableId, rating, feedback }),
  })

  const data = await res.json()
  return NextResponse.json(data)
}