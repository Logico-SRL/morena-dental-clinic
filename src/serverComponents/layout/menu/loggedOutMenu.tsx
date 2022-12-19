"use client";
import Link from "next/link";

export const loggedOutMenu = [{
    key: 'home',
    label: <Link href="/">
        Home
    </Link>
},
{
    key: 'sigin',
    label: <Link href="/signin">
        Signin
    </Link>
}];
