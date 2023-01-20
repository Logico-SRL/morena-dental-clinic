import { useAuthSession } from "../../../hooks/useAuthSession";
import UserControls from "../../../userControls";
import { loggedInMenu } from "./loggedInMenu";
import { loggedOutMenu } from "./loggedOutMenu";
import classnames from './menu.module.scss';

const SiderContainerComp = () => {

    const { isLoggedIn } = useAuthSession();
    // const items = isLoggedIn ? await loggedInMenu(session) : loggedOutMenu
    const items = isLoggedIn ? loggedInMenu : loggedOutMenu

    return <UserControls.Menu
        // theme="dark"
        className={classnames.menu}
        mode="vertical"
        items={items}
    />
}

export const SiderContainer = SiderContainerComp as any as React.FunctionComponent