import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin, comparePassword, hashPassword } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [user] = await sql`
    SELECT id, name, email, role, created_at FROM users WHERE id = ${admin.id}
  `;

  // System stats
  const [users] = await sql`SELECT COUNT(*)::int as c FROM users`;
  const [customers] = await sql`SELECT COUNT(*)::int as c FROM customers`;
  const [enquiries] = await sql`SELECT COUNT(*)::int as c FROM enquiries`;
  const [requirements] = await sql`SELECT COUNT(*)::int as c FROM requirements`;
  const [projects] = await sql`SELECT COUNT(*)::int as c FROM projects`;
  const [tasks] = await sql`SELECT COUNT(*)::int as c FROM project_tasks`;
  const [portfolio] = await sql`SELECT COUNT(*)::int as c FROM portfolio`;
  const [messages] = await sql`SELECT COUNT(*)::int as c FROM contact_messages`;

  const counts = {
    users: users.c,
    customers: customers.c,
    enquiries: enquiries.c,
    requirements: requirements.c,
    projects: projects.c,
    tasks: tasks.c,
    portfolio: portfolio.c,
    messages: messages.c,
  };

  const emailConfig = {
    from: process.env.EMAIL_FROM || '7Hills Web Solutions <contact@7hillsweb.com>',
    to: process.env.EMAIL_TO || 'contact@7hillsweb.com',
    smtpHost: process.env.SMTP_HOST || 'Simulated (local dev logging mode)',
    smtpPort: process.env.SMTP_PORT || '587',
    isConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER),
  };

  return NextResponse.json({ user, counts, emailConfig });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { name, email, currentPassword, newPassword } = body;

  const [user] = await sql`SELECT * FROM users WHERE id = ${admin.id}`;

  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required to change password.' }, { status: 400 });
    }
    const isValid = comparePassword(currentPassword, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 });
    }
    const newHash = hashPassword(newPassword);
    await sql`UPDATE users SET password_hash = ${newHash}, updated_at = NOW() WHERE id = ${admin.id}`;
  }

  if (name || email) {
    await sql`
      UPDATE users
      SET name = COALESCE(${name || null}, name),
          email = COALESCE(${email || null}, email),
          updated_at = NOW()
      WHERE id = ${admin.id}
    `;
  }

  return NextResponse.json({ success: true, message: 'Settings updated successfully.' });
}
