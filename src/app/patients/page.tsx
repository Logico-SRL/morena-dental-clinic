import React, { PropsWithChildren, Suspense } from "react";
// import { DataSource } from "typeorm";
import { Patients } from "../../clientComponents/patients";
import { Pippo } from "./pippo";
// import { UserData } from "../../clientComponents/userData";
// import { dbConfig } from "../../db/dbConfig";
// import { NodeIOCContainer } from "../../inversify/inversify.node.config";
// import { IOCServiceTypes } from "../../inversify/iocTypes";


const PatientsPage = async ({ children }: PropsWithChildren) => {



    return (
        <>
            <h1>Pazienti</h1>
            <Suspense>
                <Pippo />
            </Suspense>

            <Patients />
        </>
    )
}

export default PatientsPage;