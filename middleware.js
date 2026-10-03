import { NextResponse } from 'next/server';

const COOKIE_NAME = '7hills_admin_session';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(COOKIE_NAME)?.value;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';

    if (!sessionToken && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (sessionToken && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Protect admin API routes (except migrate which uses MIGRATE_SECRET)
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/migrate') {
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
