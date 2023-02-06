import { SplittedPage } from "../components/layout/splittedPage";
import UserControls from "../userControls";
// import { NodeIOCContainer } from "../inversify/inversify.node.config";

const Home: PageComponent = () => {

    // console.info('Home ..rest', rest);
    // const loaded = NodeIOCContainer.id;
    const Comp = () => <>
    </>

    const LeftTitle = <UserControls.Typography.Title level={3} >
        Upcoming Appointments
    </UserControls.Typography.Title>
    const RightTitle = <UserControls.Typography.Title level={3} >
        Latest Projects
    </UserControls.Typography.Title>

    return (<SplittedPage
        Left={<Comp />}
        Right={<p>Right part of the splitted Page</p>}
        LeftTitle={LeftTitle}
        RightTitle={RightTitle}
    />)
}

export default Home;