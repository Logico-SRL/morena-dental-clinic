// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from 'next-auth/react';
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"


// This function can be marked `async` if using `await` inside
export const middleware = withAuth(function middleware(request: NextRequestWithAuth) {
    // console.info(`request.nextauth.token`, request.nextauth.token);
}, {
    callbacks: {
        authorized: ({ token }) => {
            console.info(`authorized token`, token);
            return !!token;
        },
    }
})

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/((?!api|_next/static|favicon.ico).*)',
        '/protected/:path*'
    ]
}