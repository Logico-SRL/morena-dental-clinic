import { SplittedPage } from "../../serverComponents/layout/splittedPage";


const TreatmentsPage: PageComponent = async () => {

    const Comp = () => (<>
        <h1>Trattamenti</h1>
    </>)
    return (<SplittedPage Left={Comp} />)

}

export default TreatmentsPage;