import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface Token {
    role?: string;
    email?: string | null;
    name?: string | null;
    sub?: string;
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
    const token: Token | null = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        if (!token || token.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    // Protect dashboard routes based on role
    if (pathname.startsWith("/student")) {
        if (!token || token.role !== "student") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (pathname.startsWith("/recruiter")) {
        if (!token || token.role !== "recruiter") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // Redirect authenticated users away from auth pages
    if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
        const dashboardPath = token.role === "student" ? "/student" : "/recruiter";
        return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/recruiter/:path*", "/login", "/register"],
};