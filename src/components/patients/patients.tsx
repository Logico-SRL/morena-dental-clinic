'use client'

import { useRouter } from "next/navigation";
import { usePatients } from "../../hooks/usePatients";
import UserControls from "../../userControls";
import { PatientListItem } from "./patientListItem";


export const Patients = () => {

    const { patients, loading } = usePatients();
    const router = useRouter();
    const onClick = (patient: IPatient) => {
        router.push(`/patients/${patient.id}`)
    }

    return <UserControls.List
        loading={loading}
        dataSource={patients}
        renderItem={PatientListItem(onClick)}

    />
    // >{patients.map(p => <div>{`${p.id} - ${p.name}`}</div>)}</>
}