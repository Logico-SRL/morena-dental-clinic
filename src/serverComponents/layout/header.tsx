// "use client"
import UserControls from "@uc"
import { Suspense } from "react"
import { EmptyMenuContainer } from "./menu/emptyMenuContainer"
import { MenuContainer } from "./menu/menuContainer"


export const Header = () => {
  // const { isLoggedIn } = useAuthSession()

  return (
    <UserControls.Header style={{ backgroundColor: '#001529', height: 64, paddingInline: 50, lineHeight: '64px' }}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <Suspense fallback={<EmptyMenuContainer />} >
        <MenuContainer />
      </Suspense>


    </UserControls.Header>
  )
}