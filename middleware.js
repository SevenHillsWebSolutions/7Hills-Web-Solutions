import { NextResponse } from 'next/server';

const COOKIE_NAME = '7hills_admin_session';

async function isValidSession(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [base64Data, signature] = parts;

  try {
    const rawData = atob(base64Data.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(rawData);
    if (!payload.userId || !payload.exp || Date.now() > payload.exp) {
      return false;
    }

    const secret = process.env.SESSION_SECRET || '7hills-web-solutions-dev-only-insecure-secret-2026';
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigStr = atob(signature.replace(/-/g, '+').replace(/_/g, '/'));
    const sigBytes = new Uint8Array(sigStr.length);
    for (let i = 0; i < sigStr.length; i++) {
      sigBytes[i] = sigStr.charCodeAt(i);
    }

    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(base64Data));
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(COOKIE_NAME)?.value;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const hasValidSession = await isValidSession(sessionToken);

    // If attempting to access protected admin page without a valid session
    if (!hasValidSession && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl);
      if (sessionToken) {
        // Clear invalid or expired cookie
        res.cookies.delete(COOKIE_NAME);
      }
      return res;
    }

    // If already logged in and visiting /admin/login
    if (hasValidSession && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // If on /admin/login with an invalid cookie, clear it so login works cleanly
    if (!hasValidSession && isLoginPage && sessionToken) {
      const res = NextResponse.next();
      res.cookies.delete(COOKIE_NAME);
      return res;
    }
  }

  // Protect /api/admin routes
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/migrate') {
    const hasValidSession = await isValidSession(sessionToken);
    if (!hasValidSession) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      if (sessionToken) res.cookies.delete(COOKIE_NAME);
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
