import { Patients } from "../../clientComponents/patients";
import { SplittedPage } from "../../serverComponents/layout/splittedPage";


const PatientsPage: PageComponent = async () => {

    const Comp = () => <>
        <h1>Pazienti</h1>
        <Patients />
    </>

    return (<SplittedPage Left={Comp} />)
}

export default PatientsPage;