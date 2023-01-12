// 'use client'

import { usePatient } from "../../hooks/usePatient";
// import { usePatient } from "../../hooks/usePatient";
import UserControls from "../../userControls";

export const Patient = ({ patientId }: { patientId: string }) => {

    const { patient, loadingPatient } = usePatient(patientId);

    return <UserControls.Skeleton loading={loadingPatient}>
        <UserControls.Card title={patient?.firstName}>
            <UserControls.Typography.Title level={3}>
                {`id: ${patient?.id}`}
            </UserControls.Typography.Title>
        </UserControls.Card>
    </UserControls.Skeleton>
}