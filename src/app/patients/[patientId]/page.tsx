import React, { PropsWithChildren, Suspense } from "react";
import { Patient } from "../../../clientComponents/patient";


const PatientsPage = async ({ params }: PropsWithChildren<{ params: { patientId: string } }>) => {

    return (
        <>
            <h1>Paziente</h1>
            <Patient patientId={params.patientId} />
        </>
    )
}

export default PatientsPage;