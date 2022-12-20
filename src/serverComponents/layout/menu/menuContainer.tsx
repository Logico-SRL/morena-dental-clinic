import UserControls from "../../../userControls"
import { checkSSRAuthSession } from "../../../utils/checkSSRAuthSession"
import { loggedInMenu } from "./loggedInMenu"
import { loggedOutMenu } from "./loggedOutMenu"

const MenuContainerComp = async () => {

    const { isLoggedIn, session } = await checkSSRAuthSession()


    // await new Promise((res) => {
    //     setTimeout(() => {
    //         res(true)
    //     }, 5000);
    // })

    console.info('loggedInMenu', loggedInMenu);
    const items = isLoggedIn ? await loggedInMenu(session) : loggedOutMenu

    return <UserControls.Menu
        theme="dark"
        mode="horizontal"
        items={items}
    />
}

export const MenuContainer = MenuContainerComp as any as React.FunctionComponent