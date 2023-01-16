import { useAuthSession } from "../../../hooks/useAuthSession"
import UserControls from "../../../userControls"
import { loggedInHeader } from "./loggedInHeader"
import { loggedOutHeader } from "./loggedOutHeader"

const MenuContainerComp = () => {

    const { isLoggedIn } = useAuthSession();
    // const items = isLoggedIn ? await loggedInMenu(session) : loggedOutMenu
    const items = isLoggedIn ? loggedInHeader : loggedOutHeader

    return <UserControls.Menu
        // theme="dark"
        style={{ backgroundColor: 'inherit', marginLeft: 'auto', width: 'fit-content' }}
        // mode="horizontal"
        items={items}
        mode={'inline'}
        inlineCollapsed={false}
    />
}

export const MenuContainer = MenuContainerComp as any as React.FunctionComponent