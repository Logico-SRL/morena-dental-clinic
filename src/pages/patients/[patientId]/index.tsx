import { useRouter } from "next/router";
import { SplittedPage } from "../../../components/layout/splittedPage";
import { Patient } from "../../../components/patients/patient";


const PatientsPage: PageComponent = ({ }) => {

    const { query } = useRouter()
    const { patientId } = query as { patientId: string }


    return (<SplittedPage Left={<Patient patientId={patientId} />} />)
}

export default PatientsPage;