"use client";
import Link from "next/link";

export const loggedOutMenu = [{
    key: '/',
    label: <Link href="/">
        Home
    </Link>
},
{
    key: '/signin',
    label: <Link href="/signin">
        Signin
    </Link>
}];
