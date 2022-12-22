// "use client"
import UserControls from "@uc";
import { Suspense } from "react";
import { EmptyMenuContainer } from "../menu/emptyMenuContainer";
import classNames from './header.module.scss';
import { MenuContainer } from "./menuContainer";

export const Header = () => {
  // const { isLoggedIn } = useAuthSession()

  return (
    <UserControls.Header className={classNames.header}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <Suspense fallback={<EmptyMenuContainer />} >
        <MenuContainer />
      </Suspense>

    </UserControls.Header>
  )
}