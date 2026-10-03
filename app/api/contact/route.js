import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { generateEnquiryCode } from '@/lib/ids';
import { notifyAdminNewContact, sendClientContactConfirmation } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, honeypot } = body;

    // Anti-spam honeypot field
    if (honeypot) {
      // Quietly reject bots without alerting them
      return NextResponse.json({
        success: true,
        message: 'Your message has been successfully received.',
        enquiryCode: '7HWS-SPAM-PREVENTED',
      });
    }

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

    const enquiryCode = generateEnquiryCode();

    let msgId = 1;
    if (process.env.DATABASE_URL) {
      // 1. Insert into contact_messages table
      const [msgRow] = await sql`
        INSERT INTO contact_messages (name, email, phone, subject, message, status)
        VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${phone ? phone.trim() : null}, ${subject.trim()}, ${message.trim()}, 'Unread')
        RETURNING id
      `;
      msgId = msgRow.id;

      // 2. Also log as an official enquiry
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
          ${`Message ID: ${msgId}`}
        )
      `;
    }

    // 3. Dispatch automated emails asynchronously (does not block response if SMTP takes a moment)
    Promise.allSettled([
      notifyAdminNewContact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject.trim(),
        message: message.trim(),
        enquiryCode,
      }),
      sendClientContactConfirmation({
        to: email.trim().toLowerCase(),
        name: name.trim(),
        enquiryCode,
        subject: subject.trim(),
      }),
    ]).catch((e) => console.error('Background email dispatch error:', e));

    return NextResponse.json({
      success: true,
      message: 'Your message has been received! Our engineering team will review it and follow up within 24 hours.',
      enquiryCode,
      contactId: msgId,
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      { error: 'A server error occurred while processing your message. Please try again.' },
      { status: 500 }
    );
  }
}

