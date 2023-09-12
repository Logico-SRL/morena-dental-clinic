// 'use client'
// import { usePatient } from "../../hooks/usePatient";
import UserControls from "../../userControls";
import { PatientInfo } from "./patientInfo";
import { UnoPatientInfo } from "./unoPatientInfo";

export const Patient = ({ patient, loadingPatient, unoAnagrafica }: { patient: IPatient | undefined, loadingPatient: boolean, unoAnagrafica: UnoAnagrafica | undefined }) => {

    return <UserControls.Skeleton loading={loadingPatient}>
        <UserControls.Form layout="vertical">
            <PatientInfo patient={patient} />
            {unoAnagrafica && <UnoPatientInfo unoAnagrafica={unoAnagrafica} />}
        </UserControls.Form>
    </UserControls.Skeleton>
}