import type { NextRequest } from 'next/server';
import payload from 'payload';
import config from '@/payload.config';

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({ message: 'Payload API is working!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
export async function POST(req: NextRequest) {
  const body = await req.json();

  return new Response(JSON.stringify({ message: 'POST received', body }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PATCH(req: NextRequest) {
  return new Response(JSON.stringify({ message: 'PATCH received' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req: NextRequest) {
  return new Response(JSON.stringify({ message: 'DELETE received' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}