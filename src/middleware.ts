import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTHORIZATION_COOKIE_KEY } from "./app/api.service";
import { decode } from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTHORIZATION_COOKIE_KEY);

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (!pathname.startsWith("/login") && !pathname.startsWith("/signup")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = decode(token.value) as { exp?: number };
    const currentTime = Math.floor(Date.now() / 1000);

    if (!decodedToken.exp || decodedToken.exp <= currentTime) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
