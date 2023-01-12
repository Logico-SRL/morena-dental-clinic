// 'use client'

import { useRouter } from "next/navigation";
import UserControls from "../../userControls";
import { PatientListItem } from "./patientListItem";


type PropType = {
    patients: IPatient[],
    loading: boolean,
    onPatientEdit: (p: IPatient) => void
}

export const Patients: React.FunctionComponent<PropType> = ({ patients, loading, onPatientEdit }) => {


    const router = useRouter();
    const onClick = (patient: IPatient) => {
        router.push(`/patients/${patient.id}`)
    }

    const onEdit = (patient: IPatient) => {
        onPatientEdit(patient)
    }

    const Header = () => <UserControls.Row style={{ fontWeight: 'bold' }}>
        <UserControls.Col xs={7} offset={1}>
            id
        </UserControls.Col>

        <UserControls.Col xs={5}>
            First Name
        </UserControls.Col>

        <UserControls.Col xs={5}>
            Family Name
        </UserControls.Col>

        <UserControls.Col xs={5}>
            Fiscal Code
        </UserControls.Col>
        <UserControls.Col xs={1} />

    </UserControls.Row>

    return <UserControls.List
        loading={loading}
        dataSource={patients}
        header={<Header />}
        renderItem={PatientListItem({ onClick, onEdit })}

    />
    // >{patients.map(p => <div>{`${p.id} - ${p.name}`}</div>)}</>
}