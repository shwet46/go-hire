import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    if (pathname.startsWith('/student')) {
      if (!token || token.role !== 'student') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    if (pathname.startsWith('/recruiter')) {
      if (!token || token.role !== 'recruiter') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (
          pathname === '/' ||
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/register') ||
          pathname.startsWith('/login') ||
          pathname.startsWith('/jobs') ||
          pathname.startsWith('/practice')
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/student/:path*', '/recruiter/:path*', '/dashboard/:path*'],
};
