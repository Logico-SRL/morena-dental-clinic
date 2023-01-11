import { SplittedPage } from "../../components/layout/splittedPage";


const TreatmentsPage: PageComponent = () => {

    const Comp = () => (<>
        <h1>Trattamenti</h1>
    </>)
    return (<SplittedPage Left={Comp} />)

}

export default TreatmentsPage;