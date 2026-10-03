import nodemailer from 'nodemailer';

/**
 * lib/email.js — 7Hills Web Solutions Custom Company Email Service
 * 
 * Supports:
 * - Direct SMTP (Gmail App Password, Zoho Mail, Google Workspace, CPanel/Webmail, AWS SES, Resend SMTP)
 * - Custom company 'from' address (e.g., '7Hills Web Solutions <contact@7hillsweb.com>')
 * - Lead alert emails to the agency owner (Sanjay / team)
 * - Branded client confirmation emails with Requirement Codes & next steps
 * - Custom direct replies sent from the Admin Panel
 */

const DEFAULT_COMPANY_EMAIL = process.env.EMAIL_FROM || '7Hills Web Solutions <sanjayelumalai7363@gmail.com>';
const DEFAULT_ADMIN_NOTIFY_EMAIL = process.env.EMAIL_TO || 'sanjayelumalai7363@gmail.com';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !user || !pass) {
    // Return null if SMTP credentials are not yet configured in environment
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send an email with fallback to console logging if SMTP is not yet configured.
 */
export async function sendEmail({ to, subject, html, text, from = DEFAULT_COMPANY_EMAIL, replyTo }) {
  const transporter = getTransporter();

  if (!transporter) {
    console.log('====================================================');
    console.log('📧 [EMAIL DISPATCH - SIMULATION MODE (Configure SMTP in .env.local)]');
    console.log(`From:    ${from}`);
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('Body:');
    console.log(text || html);
    console.log('====================================================');
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: text || html.replace(/<[^>]+>/g, ' '),
      html,
      replyTo: replyTo || from,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email via SMTP:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 1. Send Instant Lead Notification to the 7Hills Agency Team
 */
export async function notifyAdminNewContact({ name, email, phone, subject, message, enquiryCode }) {
  const adminSubject = `⚡ New Lead Inbound: [${enquiryCode}] - ${subject}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060913; color: #f1f5f9; padding: 24px; }
          .card { background-color: #0c1222; border: 1px solid #1e293b; border-radius: 16px; padding: 28px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px; }
          .brand { font-size: 20px; font-weight: 800; color: #00e5ff; letter-spacing: -0.5px; }
          .badge { display: inline-block; background: #00e5ff20; color: #00e5ff; border: 1px solid #00e5ff40; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-top: 8px; }
          .row { margin-bottom: 12px; font-size: 14px; }
          .label { color: #94a3b8; font-weight: 600; width: 120px; display: inline-block; }
          .value { color: #ffffff; font-weight: 500; }
          .msg-box { background: #030712; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-top: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
          .footer { font-size: 12px; color: #64748b; margin-top: 24px; text-align: center; border-top: 1px solid #1e293b; padding-top: 16px; }
          .btn { display: inline-block; background: linear-gradient(135deg, #00e5ff, #0052cc); color: #ffffff !important; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="brand">7Hills Web Solutions</div>
            <div class="badge">Inbound Website Lead (${enquiryCode})</div>
          </div>
          
          <div class="row"><span class="label">Client Name:</span> <span class="value">${name}</span></div>
          <div class="row"><span class="label">Client Email:</span> <span class="value"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></span></div>
          <div class="row"><span class="label">Phone / WA:</span> <span class="value">${phone || 'Not provided'}</span></div>
          <div class="row"><span class="label">Subject:</span> <span class="value">${subject}</span></div>
          
          <div style="margin-top: 18px; font-weight: 700; font-size: 13px; color: #94a3b8; text-transform: uppercase;">Message Content:</div>
          <div class="msg-box">${message}</div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://7hillsweb.com/admin/enquiries" class="btn">Open Lead in Admin Portal</a>
          </div>

          <div class="footer">
            7Hills Web Solutions Internal Lead Management Dispatch<br>
            Time: ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: DEFAULT_ADMIN_NOTIFY_EMAIL,
    subject: adminSubject,
    html,
    replyTo: email,
  });
}

/**
 * 2. Send Client Confirmation for Contact Form
 */
export async function sendClientContactConfirmation({ to, name, enquiryCode, subject }) {
  const clientSubject = `We have received your message [${enquiryCode}] - 7Hills Web Solutions`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060913; color: #f1f5f9; padding: 24px; }
          .card { background-color: #0c1222; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; }
          .brand { font-size: 22px; font-weight: 800; color: #00e5ff; }
          .tagline { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
          .divider { height: 1px; background: #1e293b; margin: 20px 0; }
          p { font-size: 14px; line-height: 1.6; color: #cbd5e1; }
          .code-box { background: #030712; border: 1px dashed #00e5ff60; border-radius: 10px; padding: 14px; text-align: center; margin: 20px 0; }
          .code-label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 1px; }
          .code-val { font-size: 18px; font-weight: 800; color: #00e5ff; font-family: monospace; margin-top: 4px; }
          .footer { font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid #1e293b; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="brand">7Hills Web Solutions</div>
          <div class="tagline">Premium Web Development & Enterprise Platforms</div>
          <div class="divider"></div>
          
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to <strong>7Hills Web Solutions</strong> regarding <em>"${subject}"</em>. We have safely received your inquiry.</p>
          
          <div class="code-box">
            <div class="code-label">Your Inquiry Reference ID</div>
            <div class="code-val">${enquiryCode}</div>
          </div>

          <p>Our senior technical team is reviewing your details. An engineering lead will follow up with you within <strong>24 business hours</strong> with initial recommendations.</p>
          
          <p>If your project is urgent, you can also reach our engineering lead directly on WhatsApp at <strong>+91 95001 18875</strong>.</p>

          <p>Best regards,<br>
          <strong>Sanjay Elumalai</strong><br>
          Founder & Lead Engineer, 7Hills Web Solutions<br>
          <a href="https://7hillsweb.com" style="color: #00e5ff;">7hillsweb.com</a></p>

          <div class="footer">
            © ${new Date().getFullYear()} 7Hills Web Solutions. All rights reserved.<br>
            Bangalore, India
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: clientSubject,
    html,
  });
}

/**
 * 3. Send Notification to Agency Team for New Project Requirement Wizard Submission
 */
export async function notifyAdminNewRequirement(req) {
  const adminSubject = `🚀 New Project Intake [${req.requirementCode}]: ${req.customerName} (${req.websiteType})`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060913; color: #f1f5f9; padding: 24px; }
          .card { background-color: #0c1222; border: 1px solid #1e293b; border-radius: 16px; padding: 28px; max-width: 650px; margin: 0 auto; }
          .brand { font-size: 20px; font-weight: 800; color: #00e5ff; }
          .badge { display: inline-block; background: #00e5ff20; color: #00e5ff; border: 1px solid #00e5ff40; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-top: 8px; }
          .section-title { font-size: 13px; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid #1e293b; padding-bottom: 4px; }
          .row { margin-bottom: 8px; font-size: 13px; }
          .label { color: #94a3b8; font-weight: 600; width: 140px; display: inline-block; }
          .value { color: #ffffff; font-weight: 500; }
          .btn { display: inline-block; background: linear-gradient(135deg, #00e5ff, #0052cc); color: #ffffff !important; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="brand">7Hills Web Solutions</div>
          <div class="badge">Project Intake Wizard Submission</div>

          <div class="section-title">1. Customer Information</div>
          <div class="row"><span class="label">Requirement Code:</span> <span class="value" style="color: #00e5ff; font-family: monospace;">${req.requirementCode}</span></div>
          <div class="row"><span class="label">Client Name:</span> <span class="value">${req.customerName}</span></div>
          <div class="row"><span class="label">Business Name:</span> <span class="value">${req.businessName || 'N/A'}</span></div>
          <div class="row"><span class="label">Email:</span> <span class="value"><a href="mailto:${req.customerEmail}" style="color: #38bdf8;">${req.customerEmail}</a></span></div>
          <div class="row"><span class="label">Phone / WhatsApp:</span> <span class="value">${req.customerPhone || 'N/A'} (Pref: ${req.preferredContact || 'Email'})</span></div>
          <div class="row"><span class="label">Location:</span> <span class="value">${req.customerLocation || 'N/A'}</span></div>

          <div class="section-title">2. Scope & Technical Specifications</div>
          <div class="row"><span class="label">Website Type:</span> <span class="value" style="color: #a855f7; font-weight: 700;">${req.websiteType}</span></div>
          <div class="row"><span class="label">Target Budget:</span> <span class="value" style="color: #34d399; font-weight: 700;">${req.budget || 'Flexible'}</span></div>
          <div class="row"><span class="label">Target Timeline:</span> <span class="value">${req.timeline || 'Flexible'}</span></div>
          <div class="row"><span class="label">Domain & Hosting:</span> <span class="value">Domain: ${req.domainDetails || 'Not specified'} | Hosting: ${req.hostingDetails || 'Not specified'}</span></div>
          <div class="row"><span class="label">Selected Features:</span> <span class="value">${req.features || 'None listed'}</span></div>

          <div class="section-title">3. Design & Purpose</div>
          <div class="row"><span class="label">Project Purpose:</span> <span class="value">${req.purpose || 'N/A'}</span></div>
          <div class="row"><span class="label">Required Pages:</span> <span class="value">${req.pages || 'N/A'}</span></div>
          <div class="row"><span class="label">Design Style:</span> <span class="value">${req.designPreferences || 'N/A'} (Colors: ${req.brandColors || 'N/A'})</span></div>
          <div class="row"><span class="label">Reference Sites:</span> <span class="value">${req.referenceWebsites || 'None'}</span></div>
          <div class="row"><span class="label">Additional Notes:</span> <span class="value">${req.additionalRequirements || 'None'}</span></div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://7hillsweb.com/admin/requirements" class="btn">Inspect & Create Project in Admin</a>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: DEFAULT_ADMIN_NOTIFY_EMAIL,
    subject: adminSubject,
    html,
    replyTo: req.customerEmail,
  });
}

/**
 * 4. Send Client Confirmation for Project Requirement Intake
 */
export async function sendClientRequirementConfirmation({ to, name, requirementCode, websiteType, budget, timeline }) {
  const clientSubject = `Your Project Requirement has been Registered [${requirementCode}] - 7Hills Web Solutions`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060913; color: #f1f5f9; padding: 24px; }
          .card { background-color: #0c1222; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; }
          .brand { font-size: 22px; font-weight: 800; color: #00e5ff; }
          .tagline { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
          .divider { height: 1px; background: #1e293b; margin: 20px 0; }
          p { font-size: 14px; line-height: 1.6; color: #cbd5e1; }
          .code-box { background: #030712; border: 1px dashed #00e5ff60; border-radius: 12px; padding: 18px; text-align: center; margin: 22px 0; }
          .code-label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 1px; }
          .code-val { font-size: 22px; font-weight: 800; color: #00e5ff; font-family: monospace; margin-top: 4px; }
          .roadmap-step { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 13px; color: #cbd5e1; }
          .step-num { width: 22px; height: 22px; border-radius: 50%; background: #00e5ff25; color: #00e5ff; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; margin-right: 10px; flex-shrink: 0; }
          .btn { display: inline-block; background: linear-gradient(135deg, #00e5ff, #0052cc); color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; margin: 16px 0; }
          .footer { font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid #1e293b; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="brand">7Hills Web Solutions</div>
          <div class="tagline">Premium Web Development & Enterprise Platforms</div>
          <div class="divider"></div>
          
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for submitting your project specifications for <strong>${websiteType}</strong>. Your project requirement has been officially registered in our engineering pipeline.</p>
          
          <div class="code-box">
            <div class="code-label">Your Official Requirement Tracking Code</div>
            <div class="code-val">${requirementCode}</div>
            <div style="font-size: 12px; color: #94a3b8; margin-top: 6px;">Budget: ${budget || 'Flexible'} • Target Timeline: ${timeline || 'Flexible'}</div>
          </div>

          <p style="font-weight: 700; color: #ffffff;">What happens next:</p>
          <div class="roadmap-step">
            <div class="step-num">1</div>
            <div><strong>Technical Architecture Review:</strong> Our lead software architects will review your feature checklist and design preferences.</div>
          </div>
          <div class="roadmap-step">
            <div class="step-num">2</div>
            <div><strong>Direct Contact & Discovery:</strong> We will connect with you via your preferred channel within 24 hours to confirm technical scope.</div>
          </div>
          <div class="roadmap-step">
            <div class="step-num">3</div>
            <div><strong>Milestone Proposal:</strong> We will issue a structured timeline, architectural plan, and deliverables schedule.</div>
          </div>

          <div style="text-align: center;">
            <a href="https://7hillsweb.com/track?code=${requirementCode}" class="btn">Track Your Requirement Status Live</a>
          </div>

          <p>If you have any questions or additional files, simply reply to this email or reach us on WhatsApp at <strong>+91 95001 18875</strong>.</p>

          <p>Warm regards,<br>
          <strong>Sanjay Elumalai</strong><br>
          Founder & Principal Engineer, 7Hills Web Solutions<br>
          <a href="https://7hillsweb.com" style="color: #00e5ff;">7hillsweb.com</a></p>

          <div class="footer">
            © ${new Date().getFullYear()} 7Hills Web Solutions. All rights reserved.<br>
            7Hills Tech Tower, Bangalore, India
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: clientSubject,
    html,
  });
}
