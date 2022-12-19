"use client"
import { useAuthSession } from "../../hooks/useAuthSession"
import UserControls from "@uc"
import { loggedOutMenu } from "./menu/loggedOutMenu"
import { loggedInMenu } from "./menu/loggedInMenu"

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