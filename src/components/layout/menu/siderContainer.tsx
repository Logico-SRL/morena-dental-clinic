import UserControls from "../../../userControls"
import { checkSSRAuthSession } from "../../../utils/checkSSRAuthSession"
import { loggedInMenu } from "./loggedInMenu"
import { loggedOutMenu } from "./loggedOutMenu"

const SiderContainerComp = async () => {

    const { isLoggedIn, session } = await checkSSRAuthSession();
    // const items = isLoggedIn ? await loggedInMenu(session) : loggedOutMenu
    const items = isLoggedIn ? await loggedInMenu(session) : loggedOutMenu

    return <UserControls.Menu
        theme="dark"
        mode="vertical"
        items={items}
    />
}

export const SiderContainer = SiderContainerComp as any as React.FunctionComponent