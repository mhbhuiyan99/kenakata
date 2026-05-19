import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //  Read the dynamic cookie we just set up in your AuthContext/API layer
  const token = request.cookies.get("kenakata_access_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Define which routes need an active login session to look at
  const isProtectedRoute = pathname.startsWith("/checkout") || pathname.startsWith("/profile");

  // 2. Define auth utility pages (Login / Sign Up)
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  //  Guard Rule A: If trying to access checkout/profile without a token, boot them to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    // Remember where they were trying to go so we can redirect them back after logging in
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //  Guard Rule B: If already logged in, block them from seeing the login/signup forms again
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

//  Matcher configuration: Tells Next.js exactly which paths to monitor
export const config = {
  matcher: [
    "/checkout/:path*", 
    "/profile/:path*", 
    "/login", 
    "/signup"
  ],
};