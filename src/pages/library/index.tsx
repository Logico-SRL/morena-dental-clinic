import { SplittedPage } from "../../components/layout/splittedPage";
import { Library } from "../../components/library/library";
import { SearchOnline } from "../../components/search/searchOnline";
import { useLibrary } from "../../hooks/useLibrary";
import UserControls from "../../userControls";


const LibraryPage: PageComponent = () => {

    const { addToLibrary } = useLibrary();

    const onSaveItem = async (item: IPubMedDetail) => {
        await addToLibrary(item);

    }

    const LeftTitle = <UserControls.Typography.Title level={3}>
        LIBRARY
    </UserControls.Typography.Title>

    const RightTitle = <UserControls.Typography.Title level={4}>
        Search Online
    </UserControls.Typography.Title>

    return (<SplittedPage
        LeftTitle={LeftTitle}
        RightTitle={RightTitle}
        Left={<Library />}
        Right={<SearchOnline onSaveItem={onSaveItem} />} />)

}

export default LibraryPage;