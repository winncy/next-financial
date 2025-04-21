import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/enterprise", request.url));
  }
  if (pathname === "/feasibility") {
    return NextResponse.redirect(new URL("/feasibility/report", request.url));
  }
  return NextResponse.next();
}
