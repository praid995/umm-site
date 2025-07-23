import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Capture analytics data
  const requestTime = Date.now();
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const ipAddress = request.headers.get('x-forwarded-for') || '';
  
  // You would normally send this data to your analytics service
  console.log({
    timestamp: new Date(requestTime).toISOString(),
    pathname,
    userAgent,
    referer,
    ipAddress: ipAddress.split(',')[0].trim(), // Get just the client IP
  });
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files, api routes, and _next
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};