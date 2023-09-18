import { SplittedPage } from "../../components/layout/splittedPage";
import { Logs } from "../../components/logs/logs";
import UserControls from "../../userControls";

const LeftTitle = () => {
    return <>
        <UserControls.Typography.Title level={3}>
            Logs
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
        fullWidth
        LeftTitle={<LeftTitle />}
        Left={<Logs />}
    />)
}

export default Comp;