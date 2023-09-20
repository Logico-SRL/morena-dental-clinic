import { Dashboard } from "../components/dashboard/dashboard";
import { LatestProjects } from "../components/dashboard/latestProjects";
import { SplittedPage } from "../components/layout/splittedPage";
import UserControls from "../userControls";
// import { NodeIOCContainer } from "../inversify/inversify.node.config";

const Home: PageComponent = () => {

    const LeftTitle = <UserControls.Typography.Title level={3} >
        UPCOMING APPOINTMENTS
    </UserControls.Typography.Title>
    const RightTitle = <UserControls.Typography.Title level={4} >
        Latest Projects
    </UserControls.Typography.Title>

    return (<SplittedPage
        Left={<Dashboard />}
        Right={<LatestProjects />}
        LeftTitle={LeftTitle}
        RightTitle={RightTitle}
    />)
}

export default Home;