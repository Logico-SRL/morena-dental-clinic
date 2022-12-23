"server only";
import { Session } from "next-auth";
import { Disconnect } from "../../user/disconnect";
import { UserAvatar } from "../../user/userAvatar";
import styles from "./header.module.scss";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export async function loggedInHeader(session: Session | null) {

    return [
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