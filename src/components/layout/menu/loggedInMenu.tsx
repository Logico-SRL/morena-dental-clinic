"server only";
import Link from "next/link";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export const loggedInMenu = [{
    key: '/',
    label: <Link href="/">
        Home
    </Link>
},
{
    key: '/protected',
    label: <Link href="/protected">
        Protected
    </Link>
},
{
    key: '/patients',
    label: <Link href="/patients">
        Pazienti
    </Link>
},
{
    key: '/treatments',
    label: <Link href="/treatments">
        Trattamenti
    </Link>
}]

