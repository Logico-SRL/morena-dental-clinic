import { SplittedPage } from "../../../components/layout/splittedPage";
import { Patient } from "../../../components/patients/patient";


const PatientsPage: PageComponent = async ({ params }) => {
    const { patientId } = params as { patientId: string }

    const Comp = () => <>
        <h1>Paziente</h1>
        <Patient patientId={params.patientId} />
    </>

    return (<SplittedPage Left={Comp} />)
}

export default PatientsPage;