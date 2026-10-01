import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import { generateCustomerCode } from '@/lib/ids';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  let customers;
  if (search) {
    const term = `%${search}%`;
    customers = await sql`
      SELECT c.*,
        (SELECT COUNT(*) FROM projects WHERE customer_id = c.id)::int as project_count,
        (SELECT COUNT(*) FROM requirements WHERE customer_id = c.id)::int as requirement_count
      FROM customers c
      WHERE c.name ILIKE ${term}
         OR c.customer_code ILIKE ${term}
         OR c.email ILIKE ${term}
         OR c.business_name ILIKE ${term}
         OR c.location ILIKE ${term}
      ORDER BY c.id DESC
    `;
  } else {
    customers = await sql`
      SELECT c.*,
        (SELECT COUNT(*) FROM projects WHERE customer_id = c.id)::int as project_count,
        (SELECT COUNT(*) FROM requirements WHERE customer_id = c.id)::int as requirement_count
      FROM customers c
      ORDER BY c.id DESC
    `;
  }

  return NextResponse.json({ customers });
}

export async function POST(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { name, business_name, email, phone, whatsapp, location, website, notes } = body;

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const customerCode = generateCustomerCode();

  const [row] = await sql`
    INSERT INTO customers (customer_code, name, business_name, email, phone, whatsapp, location, website, notes)
    VALUES (
      ${customerCode},
      ${name.trim()},
      ${business_name ? business_name.trim() : null},
      ${email.trim().toLowerCase()},
      ${phone ? phone.trim() : null},
      ${whatsapp ? whatsapp.trim() : null},
      ${location ? location.trim() : null},
      ${website ? website.trim() : null},
      ${notes ? notes.trim() : null}
    )
    RETURNING id
  `;

  return NextResponse.json({
    success: true,
    message: 'Customer created successfully.',
    customerId: row.id,
    customerCode,
  });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, name, business_name, email, phone, whatsapp, location, website, notes } = body;

  if (!id) return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });

  await sql`
    UPDATE customers
    SET name = COALESCE(${name || null}, name),
        business_name = COALESCE(${business_name !== undefined ? business_name : null}, business_name),
        email = COALESCE(${email || null}, email),
        phone = COALESCE(${phone !== undefined ? phone : null}, phone),
        whatsapp = COALESCE(${whatsapp !== undefined ? whatsapp : null}, whatsapp),
        location = COALESCE(${location !== undefined ? location : null}, location),
        website = COALESCE(${website !== undefined ? website : null}, website),
        notes = COALESCE(${notes !== undefined ? notes : null}, notes),
        updated_at = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, message: 'Customer updated successfully.' });
}

export async function DELETE(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });

  await sql`DELETE FROM customers WHERE id = ${id}`;

  return NextResponse.json({ success: true, message: 'Customer deleted successfully.' });
}
