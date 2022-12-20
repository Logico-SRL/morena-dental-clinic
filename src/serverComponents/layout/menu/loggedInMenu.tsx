"server only";
import Link from "next/link";
import styles from "../header.module.scss";
import { UserAvatar } from "../../user/userAvatar";
import { Disconnect } from "../../user/disconnect";
import { Session } from "next-auth";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export async function loggedInMenu(session: Session | null) {

    return [{
        key: 'home',
        label: <Link href="/">
            Home
        </Link>
    },
    {
        key: 'protected',
        label: <Link href="/protected">
            Protected
        </Link>
    },
    {
        key: 'patients',
        label: <Link href="/patients">
            Pazienti
        </Link>
    },
    {
        key: 'avatar',
        label: <UserAvatar session={session} />,
        className: styles.userAvatar,
        children: [
            {
                key: 'logout',
                label: <Disconnect />
            },
        ]
    }]

}