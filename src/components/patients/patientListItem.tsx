'use client'

// import { usePatient } from "../../hooks/usePatient";
import UserControls from "../../userControls";

export const PatientListItem = (onClick: (patient: IPatient) => void) => (patient: IPatient) => {

    // const { push } = router;

    const onPatientClick = () => {
        onClick(patient)
        // router.push(`/patients/${patient.id}`)
    }
    // const patient = usePatient(patientId);
    return <UserControls.List.Item className="touchable" onClick={onPatientClick}>
        <UserControls.List.Item.Meta title={patient.id} description={patient.name} />
        {/* {patient.name}
        </UserControls.List.Item.Meta> */}
    </UserControls.List.Item>
}