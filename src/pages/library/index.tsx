import { SplittedPage } from "../../components/layout/splittedPage";


const LibraryPage: PageComponent = () => {

    const Comp = () => (<>
        <h1>Library</h1>
    </>)
    return (<SplittedPage Left={<Comp />} />)

}

export default LibraryPage;