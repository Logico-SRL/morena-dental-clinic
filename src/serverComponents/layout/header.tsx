// "use client"
import UserControls from "@uc"
import { Suspense } from "react"
import { MenuContainer } from "./menu/menuContainer"


export const Header = () => {
  // const { isLoggedIn } = useAuthSession()

  return (
    <UserControls.Header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <Suspense>
        <MenuContainer />
      </Suspense>


    </UserControls.Header>
  )
}