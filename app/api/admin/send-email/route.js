import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { to, subject, message, clientName } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Recipient email, subject, and message are required.' },
        { status: 400 }
      );
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060913; color: #f1f5f9; padding: 24px; }
            .card { background-color: #0c1222; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .brand { font-size: 20px; font-weight: 800; color: #00e5ff; }
            .divider { height: 1px; background: #1e293b; margin: 18px 0; }
            .content { font-size: 14px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap; }
            .footer { font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid #1e293b; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="brand">7Hills Web Solutions</div>
            <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Official Communication</div>
            <div class="divider"></div>

            <p style="font-size: 14px; color: #cbd5e1;">Dear ${clientName || 'Client'},</p>
            
            <div class="content">${message}</div>

            <div style="margin-top: 28px; font-size: 13px; color: #cbd5e1;">
              Warm regards,<br>
              <strong>${admin.name}</strong><br>
              7Hills Web Solutions Team<br>
              <a href="https://7hillsweb.com" style="color: #00e5ff; text-decoration: none;">7hillsweb.com</a>
            </div>

            <div class="footer">
              7Hills Web Solutions • Tech Tower, Outer Ring Rd, Bangalore, India<br>
              Direct WhatsApp & Phone: +91 95001 18875
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await sendEmail({
      to,
      subject,
      html,
      text: message,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to dispatch email.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: result.simulated
        ? 'Email simulated in development mode (logged to console).'
        : 'Email dispatched successfully to recipient.',
    });
  } catch (error) {
    console.error('Error in send-email route:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
