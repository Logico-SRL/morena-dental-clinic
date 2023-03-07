// 'use client'

import { useRouter } from "next/navigation";
import { ChangeEvent, forwardRef, useImperativeHandle } from "react";
import UserControls from "../../userControls";
import { PatientListItem } from "./patientListItem";


type PropType = {
    patients: IPatient[],
    loading: boolean,
    onPatientEdit: (p: IPatient) => void,
    onSearchChange: (search: string) => void,
    // searchInputValue: string
}

export type PatientsRefType = {
    clearInput: () => void
}

export const Patients = forwardRef<PatientsRefType, PropType>(({ patients, loading, onPatientEdit, onSearchChange }, ref) => {

    const [form] = UserControls.Form.useForm();

    useImperativeHandle(ref, () => {
        return {
            clearInput: () => {
                form.setFieldValue('search', '')
            }
        };
    }, []);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    }

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
            <UserControls.Form form={form} initialValues={{ search: '' }} >
                <UserControls.Form.Item label="Search" name={'search'}>
                    <UserControls.Input placeholder="Lastname, Firstname *min 3 charachters" onChange={onInputChange} />
                </UserControls.Form.Item>
            </UserControls.Form>
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
})