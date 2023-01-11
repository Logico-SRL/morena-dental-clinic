// 'use client'

import { useRouter } from "next/navigation";
import UserControls from "../../userControls";
import { PatientListItem } from "./patientListItem";


type PropType = {
    patients: IPatient[],
    loading: boolean
}

export const Patients: React.FunctionComponent<PropType> = ({ patients, loading }) => {


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