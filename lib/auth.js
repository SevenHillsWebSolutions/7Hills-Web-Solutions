import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { sql } from './db.js';

function getSecret() {
  return process.env.SESSION_SECRET || '7hills-web-solutions-dev-only-insecure-secret-2026';
}

const COOKIE_NAME = '7hills_admin_session';

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export function createSessionToken(payload, expiresInMs = 7 * 24 * 60 * 60 * 1000) {
  const expiresAt = Date.now() + expiresInMs;
  const data = JSON.stringify({ ...payload, exp: expiresAt });
  const base64Data = Buffer.from(data).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(base64Data)
    .digest('base64url');
  return `${base64Data}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [base64Data, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', getSecret())
    .update(base64Data)
    .digest('base64url');
  if (signature !== expectedSig) return null;

  try {
    const jsonStr = Buffer.from(base64Data, 'base64url').toString('utf8');
    const payload = JSON.parse(jsonStr);
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const session = verifySessionToken(token);
    if (!session || !session.userId) return null;

    const [user] = await sql`SELECT id, name, email, role FROM users WHERE id = ${session.userId}`;
    return user || null;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
