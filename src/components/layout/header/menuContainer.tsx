import { useAuthSession } from "../../../hooks/useAuthSession"
import UserControls from "../../../userControls"
import { loggedInHeader } from "./loggedInHeader"
import { loggedOutHeader } from "./loggedOutHeader"

const MenuContainerComp = () => {

    const { isLoggedIn } = useAuthSession();
    // const items = isLoggedIn ? await loggedInMenu(session) : loggedOutMenu
    const items = isLoggedIn ? loggedInHeader : loggedOutHeader

    return <UserControls.Menu
        theme="dark"
        mode="horizontal"
        items={items}
    />
}

export const MenuContainer = MenuContainerComp as any as React.FunctionComponent