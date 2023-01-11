import { useRouter } from "next/router";
import { SplittedPage } from "../../../components/layout/splittedPage";
import { Patient } from "../../../components/patients/patient";


const PatientsPage: PageComponent = ({ }) => {

    const { query } = useRouter()


    const { patientId } = query as { patientId: string }

    const Comp = () => <>
        <h1>Paziente</h1>
        <Patient patientId={patientId} />
    </>

    return (<SplittedPage Left={Comp} />)
}

export default PatientsPage;