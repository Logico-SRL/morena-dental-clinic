import { SplittedPage } from "../../components/layout/splittedPage";
import { Search } from "../../components/search/search";
import { SearchOnline } from "../../components/search/searchOnline";
import UserControls from "../../userControls";


const LibraryPage: PageComponent = () => {

    const LeftTitle = <UserControls.Typography.Title level={3}>
        FULL SEARCH
    </UserControls.Typography.Title>

    const RightTitle = <UserControls.Typography.Title level={4}>
        Search Online
    </UserControls.Typography.Title>

    return (<SplittedPage
        LeftTitle={LeftTitle}
        RightTitle={RightTitle}
        Left={<Search />}
        Right={<SearchOnline />} />)



}

export default LibraryPage;