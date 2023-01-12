// 'use client'

// import { usePatient } from "../../hooks/usePatient";
import React from "react";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";


type PropType = {
    onClick: (patient: IPatient) => void,
    onEdit: (patient: IPatient) => void,

}
export const PatientListItem = ({ onClick, onEdit }: PropType) => (patient: IPatient) => {

    // const { push } = router;

    const onPatientClick = () => {
        onClick(patient)
        // router.push(`/patients/${patient.id}`)
    }
    const onPatientEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onEdit(patient)
        // router.push(`/patients/${patient.id}`)
    }
    // const patient = usePatient(patientId);
    return <UserControls.List.Item className="touchable" onClick={onPatientClick}>
        <UserControls.Row style={{ flex: 1 }}>

            <UserControls.Col xs={8}>
                {patient.id}
            </UserControls.Col>

            <UserControls.Col xs={5}>
                {patient.firstName}
            </UserControls.Col>

            <UserControls.Col xs={5}>
                {patient.familyName}
            </UserControls.Col>

            <UserControls.Col xs={5}>
                {patient.fiscalCode}
            </UserControls.Col>
            <UserControls.Col xs={1}>
                <UserControls.Button icon={<AntdIcons.EditOutlined />} onClick={onPatientEdit} />
            </UserControls.Col>

        </UserControls.Row>
    </UserControls.List.Item>
}