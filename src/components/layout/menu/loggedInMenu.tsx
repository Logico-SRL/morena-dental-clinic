// "server only";
import Link from "next/link";
import { AntdIcons } from "../../../userControls/icons";
import classnames from './menu.module.scss';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export const loggedInMenu = [{
    key: '/',
    label: <Link href="/" className={classnames.menuItem}>
        <AntdIcons.AppstoreOutlined />
        BOARD
    </Link>
},
{
    key: '/projects',
    label: <Link href="/projects" className={classnames.menuItem}>

        <AntdIcons.TaobaoOutlined />
        PROJECTS

    </Link>
},
{
    key: '/patients',
    label: <Link href="/patients" className={classnames.menuItem}>
        <AntdIcons.UserOutlined />
        PATIENTS
    </Link>
},
{
    key: '/library',
    label: <Link href="/library" className={classnames.menuItem}>
        <AntdIcons.ContainerOutlined />
        LIBRARY
    </Link>
},
{
    key: '/settings',
    label: <Link href="/settings" className={classnames.menuItem}>
        <AntdIcons.SettingOutlined />
        SETTINGS
    </Link>
},
{
    key: '/logs',
    label: <Link href="/logs" className={classnames.menuItem}>
        <AntdIcons.BugOutlined />
        LOGS
    </Link>
}
]

