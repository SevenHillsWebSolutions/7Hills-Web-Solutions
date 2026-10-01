import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import { generateCustomerCode } from '@/lib/ids';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  let enquiries;

  if (status && status !== 'All' && search) {
    const term = `%${search}%`;
    enquiries = await sql`
      SELECT e.*, c.name as cust_name, c.customer_code, c.email as cust_email
      FROM enquiries e
      LEFT JOIN customers c ON e.customer_id = c.id
      WHERE e.status = ${status}
        AND (e.enquiry_code ILIKE ${term} OR e.subject ILIKE ${term} OR e.message ILIKE ${term} OR e.name ILIKE ${term} OR e.email ILIKE ${term})
      ORDER BY e.id DESC
    `;
  } else if (status && status !== 'All') {
    enquiries = await sql`
      SELECT e.*, c.name as cust_name, c.customer_code, c.email as cust_email
      FROM enquiries e
      LEFT JOIN customers c ON e.customer_id = c.id
      WHERE e.status = ${status}
      ORDER BY e.id DESC
    `;
  } else if (search) {
    const term = `%${search}%`;
    enquiries = await sql`
      SELECT e.*, c.name as cust_name, c.customer_code, c.email as cust_email
      FROM enquiries e
      LEFT JOIN customers c ON e.customer_id = c.id
      WHERE e.enquiry_code ILIKE ${term} OR e.subject ILIKE ${term} OR e.message ILIKE ${term} OR e.name ILIKE ${term} OR e.email ILIKE ${term}
      ORDER BY e.id DESC
    `;
  } else {
    enquiries = await sql`
      SELECT e.*, c.name as cust_name, c.customer_code, c.email as cust_email
      FROM enquiries e
      LEFT JOIN customers c ON e.customer_id = c.id
      ORDER BY e.id DESC
    `;
  }

  return NextResponse.json({ enquiries });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, status, notes } = body;

  if (!id) return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });

  await sql`
    UPDATE enquiries
    SET status = COALESCE(${status || null}, status),
        notes = COALESCE(${notes !== undefined ? notes : null}, notes),
        updated_at = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, message: 'Enquiry updated successfully' });
}

export async function POST(request) {
  // Convert enquiry to customer
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { action, enquiryId } = body;

  const [enquiry] = await sql`SELECT * FROM enquiries WHERE id = ${enquiryId}`;
  if (!enquiry) return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });

  if (action === 'convert_to_customer') {
    let customerId = enquiry.customer_id;
    let customerCode;

    if (!customerId && enquiry.email) {
      const [existing] = await sql`SELECT id, customer_code FROM customers WHERE email = ${enquiry.email}`;
      if (existing) {
        customerId = existing.id;
        customerCode = existing.customer_code;
      } else {
        customerCode = generateCustomerCode();
        const [newCust] = await sql`
          INSERT INTO customers (customer_code, name, email, phone, notes)
          VALUES (${customerCode}, ${enquiry.name || 'New Customer'}, ${enquiry.email}, ${enquiry.phone || null}, ${`Converted from Enquiry ${enquiry.enquiry_code}`})
          RETURNING id
        `;
        customerId = newCust.id;
      }
    }

    await sql`
      UPDATE enquiries
      SET customer_id = ${customerId}, status = 'Converted', updated_at = NOW()
      WHERE id = ${enquiryId}
    `;

    return NextResponse.json({
      success: true,
      message: 'Enquiry converted to customer record.',
      customerId,
      customerCode,
    });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
