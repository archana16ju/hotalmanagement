import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { tableId: string } }) {
  const { tableId } = params
  const res = await fetch(`${process.env.PAYLOAD_URL}/api/payments?where[table][equals]=${tableId}`, {
    headers: { Authorization: `Bearer ${process.env.PAYLOAD_SECRET}` }
  })
  const data = await res.json()
  return NextResponse.json(data)
}