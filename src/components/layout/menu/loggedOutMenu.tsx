"use client";
import Link from "next/link";
import { AntdIcons } from "../../../userControls/icons";
import classnames from './menu.module.scss';

export const loggedOutMenu = [{
    key: '/',
    label: <Link href="/" className={classnames.menuItem}>
        <AntdIcons.HomeOutlined />
        Home
    </Link>
},
{
    key: '/signin',
    label: <Link href="/signin" className={classnames.menuItem}>
        <AntdIcons.LoginOutlined />
        Signin
    </Link>
}];
