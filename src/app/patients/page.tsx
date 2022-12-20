import { NextPage } from "next";
import React, { PropsWithChildren, Suspense } from "react";
import { Patients } from "../../clientComponents/patients";


const PatientsPage: PageComponent = async () => {

    return (
        <>
            <h1>Pazienti</h1>
            <Patients />
        </>
    )
}

export default PatientsPage;