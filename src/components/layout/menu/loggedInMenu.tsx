// "server only";
import Link from "next/link";
import UserControls from "../../../userControls";
import { AntdIcons } from "../../../userControls/icons";
import classnames from './menu.module.scss';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export const loggedInMenu = [{
    key: '/',
    label: <Link href="/" className={classnames.menuItem}>
        <UserControls.Space>
            <AntdIcons.AppstoreOutlined />
            BOARD
        </UserControls.Space>
    </Link>
},
{
    key: '/projects',
    label: <Link href="/projects" className={classnames.menuItem}>
        <UserControls.Space>
            <AntdIcons.TaobaoOutlined />
            PROJECTS
        </UserControls.Space>
    </Link>
},
{
    key: '/patients',
    label: <Link href="/patients" className={classnames.menuItem}>
        <UserControls.Space>
            <AntdIcons.UserOutlined />
            PATIENTS
        </UserControls.Space>
    </Link>
},
{
    key: '/library',
    label: <Link href="/library" className={classnames.menuItem}>
        <UserControls.Space>
            <AntdIcons.ContainerOutlined />
            LIBRARY
        </UserControls.Space>
    </Link>
}]

