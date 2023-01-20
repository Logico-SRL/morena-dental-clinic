import { SplittedPage } from "../../components/layout/splittedPage";
import { Settings } from "../../components/settings/settings";
import UserControls from "../../userControls";

const LeftTitle = () => {
    return <>
        <UserControls.Typography.Title level={3}>
            SETTINGS
        </UserControls.Typography.Title>
    </>
}

const Comp: PageComponent = () => {


    const RightTitle = () => {
        return <UserControls.Typography.Title level={4}>
            ...
        </UserControls.Typography.Title>
    }

    return (<SplittedPage
        LeftTitle={<LeftTitle />}
        RightTitle={<RightTitle />}
        Left={<Settings />}
    />)
}

export default Comp;