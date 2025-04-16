import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/home") {
    return NextResponse.rewrite(new URL("/home/enterprise", request.url));
  }
  return NextResponse.next();
}
