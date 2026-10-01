import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const messages = await sql`SELECT * FROM contact_messages ORDER BY id DESC`;

  return NextResponse.json({ messages });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, status } = body;

  if (!id) return NextResponse.json({ error: 'Message ID required' }, { status: 400 });

  await sql`
    UPDATE contact_messages
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, message: 'Message updated' });
}

export async function DELETE(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Message ID required' }, { status: 400 });

  await sql`DELETE FROM contact_messages WHERE id = ${id}`;

  return NextResponse.json({ success: true, message: 'Message deleted' });
}
