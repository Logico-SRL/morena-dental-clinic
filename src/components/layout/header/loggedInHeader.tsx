"server only";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Disconnect } from "../../user/disconnect";
import { UserAvatar } from "../../user/userAvatar";
import classnames from './header.module.scss';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export const loggedInHeader: ItemType[] = [
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
        key: 'avatar',
        label: <UserAvatar />,
        disabled: true,
        className: classnames.disabledMenuItem
    },
    {
        key: 'logout',
        label: <Disconnect />
    },

]