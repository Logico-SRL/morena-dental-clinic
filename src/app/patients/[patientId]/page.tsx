import { Patient } from "../../../clientComponents/patient";
import { SplittedPage } from "../../../serverComponents/layout/splittedPage";


const PatientsPage: PageComponent = async ({ params }) => {
    const { patientId } = params as { patientId: string }

    const Comp = () => <>
        <h1>Paziente</h1>
        <Patient patientId={params.patientId} />
    </>

    return (<SplittedPage Left={Comp} />)
}

export default PatientsPage;