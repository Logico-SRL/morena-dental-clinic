"use client"
import Link from "next/link"
import { useAuthSession } from "../../hooks/useAuthSession"
import UserControls from "@uc"
import styles from "./header.module.scss"
import { UserAvatar } from "../user/userAvatar"
import { Disconnect } from "../user/disconnect"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

const loggedInMenu = [{
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
  key: 'avatar',
  label: <UserAvatar />,
  className: styles.userAvatar,
  children: [
    {
      key: 'logout',
      label: <Disconnect />
    },
  ]
}]

const loggedOutMenu = [{
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
}]

export const Header = () => {
  const { isLoggedIn } = useAuthSession()

  return (
    <UserControls.Header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>


      <UserControls.Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['2']}
        items={isLoggedIn ? loggedInMenu : loggedOutMenu}
      />

    </UserControls.Header>
  )
}