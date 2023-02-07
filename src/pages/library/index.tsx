import { SplittedPage } from "../../components/layout/splittedPage";
import { Library } from "../../components/library/library";
import UserControls from "../../userControls";


const LibraryPage: PageComponent = () => {

    const LeftTitle = <UserControls.Typography.Title level={3}>
        Library
    </UserControls.Typography.Title>

    const RightTitle = <UserControls.Typography.Title level={4}>
        Search Online
    </UserControls.Typography.Title>

    return (<SplittedPage
        LeftTitle={LeftTitle}
        RightTitle={RightTitle}
        Left={<Library />} />)

}

export default LibraryPage;