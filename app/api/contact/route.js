import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { generateEnquiryCode } from '@/lib/ids';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Insert into contact_messages table
    const [msgRow] = await sql`
      INSERT INTO contact_messages (name, email, phone, subject, message, status)
      VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${phone ? phone.trim() : null}, ${subject.trim()}, ${message.trim()}, 'Unread')
      RETURNING id
    `;

    // 2. Also log as an official enquiry
    const enquiryCode = generateEnquiryCode();
    await sql`
      INSERT INTO enquiries (enquiry_code, name, email, phone, subject, message, status, source, notes)
      VALUES (
        ${enquiryCode},
        ${name.trim()},
        ${email.trim().toLowerCase()},
        ${phone ? phone.trim() : null},
        ${subject.trim()},
        ${message.trim()},
        'New',
        'Contact Page Form',
        ${`Message ID: ${msgRow.id}`}
      )
    `;

    return NextResponse.json({
      success: true,
      message: 'Your message has been successfully received and logged into our management system.',
      enquiryCode,
      contactId: msgRow.id,
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      { error: 'A server error occurred while processing your message. Please try again.' },
      { status: 500 }
    );
  }
}
