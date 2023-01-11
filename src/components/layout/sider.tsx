// "use client"
import UserControls from "@uc"
import { Suspense } from "react"
import classnames from './layoutCommon.module.scss'
import { SiderContainer } from "./menu/siderContainer"

export const Sider = () => {
  // const { isLoggedIn } = useAuthSession()

  return (
    <UserControls.Sider className={classnames.sider} width={'auto'}>

      <Suspense>
        <SiderContainer />
      </Suspense>

    </UserControls.Sider>
  )
}