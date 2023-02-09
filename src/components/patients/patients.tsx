// 'use client'

import { useRouter } from "next/navigation";
import { ChangeEventHandler, FunctionComponent } from "react";
import UserControls from "../../userControls";
import { PatientListItem } from "./patientListItem";


type PropType = {
    patients: IPatient[],
    loading: boolean,
    onPatientEdit: (p: IPatient) => void,
    onSearchChange: ChangeEventHandler<HTMLInputElement>,
    searchInputValue: string
}

export const Patients: FunctionComponent<PropType> = ({ patients, loading, onPatientEdit, onSearchChange, searchInputValue }) => {


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

    return <UserControls.Row>
        <UserControls.Col xs={24}>
            <UserControls.Form.Item label="Search" >
                <UserControls.Input placeholder="Lastname, Firstname *min 3 charachters" onChange={onSearchChange} value={searchInputValue} />
            </UserControls.Form.Item>

        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.List
                loading={loading}
                dataSource={patients}
                header={<Header />}
                renderItem={PatientListItem({ onClick, onEdit })}
            />
        </UserControls.Col>
    </UserControls.Row>
}