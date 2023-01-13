// middleware.ts
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";


// This function can be marked `async` if using `await` inside
export const middleware = withAuth(function middleware(request: NextRequestWithAuth) {
    // console.info(`request.nextauth.token`, request.nextauth.token);
}, {
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
        // '/((?!api|_next/static|favicon.ico).*)',
        '/api/protected/:path*'
    ]
}