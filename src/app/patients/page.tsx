import React, { PropsWithChildren, Suspense } from "react";
import { Patients } from "../../clientComponents/patients";


const PatientsPage = async ({ children }: PropsWithChildren) => {



    return (
        <>
            <h1>Pazienti</h1>
            <Patients />
        </>
    )
}

export default PatientsPage;