import { NextPage } from "next";
import React, { PropsWithChildren, Suspense } from "react";
import { Patient } from "../../../clientComponents/patient";


const PatientsPage: PageComponent = async ({ params }) => {
    const { patientId } = params as { patientId: string }

    return (
        <>
            <h1>Paziente</h1>
            <Patient patientId={params.patientId} />
        </>
    )
}

export default PatientsPage;