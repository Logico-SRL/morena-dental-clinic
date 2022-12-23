import UserControls from "../../../userControls"
import { checkSSRAuthSession } from "../../../utils/checkSSRAuthSession"
import { loggedInHeader } from "./loggedInHeader"
import { loggedOutHeader } from "./loggedOutHeader"

const MenuContainerComp = async () => {

    const { isLoggedIn, session } = await checkSSRAuthSession();
    // const items = isLoggedIn ? await loggedInMenu(session) : loggedOutMenu
    const items = isLoggedIn ? await loggedInHeader(session) : loggedOutHeader

    return <UserControls.Menu
        theme="dark"
        mode="horizontal"
        items={items}
    />
}

export const MenuContainer = MenuContainerComp as any as React.FunctionComponent