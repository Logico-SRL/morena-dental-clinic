"server only";
import { Disconnect } from "../../user/disconnect";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export const loggedInHeader = [
    // {
    //     key: 'avatar',
    //     label: <UserAvatar />,
    //     className: styles.userAvatar,
    //     children: [
    //         {
    //             key: 'logout',
    //             label: <Disconnect />
    //         },
    //     ]
    // }

    {
        key: 'logout',
        label: <Disconnect />
    },

]