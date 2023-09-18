// middleware.ts
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export const middleware = withAuth(function middleware(req: NextRequestWithAuth) {
    // console.info(req.nextUrl.pathname.startsWith, `request.nextauth.token`, req.nextauth.token);
    if (req.nextUrl.pathname.startsWith('/signin') || req.nextUrl.pathname.startsWith('/_next')) {

        return NextResponse.next();
    }
    if (!req.nextauth.token) {
        const loginUrl = new URL("/signin", req.url)
        loginUrl.searchParams.set('from', req.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next();
}, {
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        authorized: ({ token }) => {
            // if (token)
            //     return true
            // else {
            //     // const resp = NextResponse.next({
            //     //     status: 405,
            //     //     statusText: 'Not Allowed'
            //     // })
            //     // return resp;
            //     throw new Error("not-authorized");
            // }

            // console.info(`authorized token`, token);
            return !!token;
        },

    }
})

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/',
        '/((?!api|_next/static|favicon.ico).*)',
        // '/api/protected/:path*'
    ]
}