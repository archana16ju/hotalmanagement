import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { tableId: string } }) {
  const { tableId } = params
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?where[table][equals]=${tableId}`, {
    headers: { Authorization: `Bearer ${process.env.PAYLOAD_SECRET}` },
  })
  const data = await res.json()
  return NextResponse.json(data)
}