import { SplittedPage } from "../../components/layout/splittedPage";
import { Patients } from "../../components/patients/patients";


const PatientsPage: PageComponent = () => {

    const Comp = () => <>
        <h1>Pazienti</h1>
        <Patients />
    </>

    return (<SplittedPage Left={Comp} />)
}

export default PatientsPage;