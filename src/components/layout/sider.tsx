// "use client"
import UserControls from "@uc"
import { Suspense } from "react"
import { SiderContainer } from "./menu/siderContainer"


export const Sider = () => {
  // const { isLoggedIn } = useAuthSession()

  return (
    <UserControls.Sider style={{ backgroundColor: '#001529' }}>

      <Suspense>
        <SiderContainer />
      </Suspense>

    </UserControls.Sider>
  )
}