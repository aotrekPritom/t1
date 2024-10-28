import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Retrieve token from cookies

  const { pathname } = request.nextUrl;

  // Redirect to login if trying to access /join without a token
  if (!token && pathname === '/join') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect to home if trying to access /login or /register with a token
  if (token && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Allow request if it doesn’t match the conditions
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/join', '/login', '/register'], 
};
