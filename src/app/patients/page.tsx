import React, { PropsWithChildren } from "react";
// import { DataSource } from "typeorm";
import { Patients } from "../../clientComponents/patients";
// import { UserData } from "../../clientComponents/userData";
// import { dbConfig } from "../../db/dbConfig";
// import { NodeIOCContainer } from "../../inversify/inversify.node.config";
// import { IOCServiceTypes } from "../../inversify/iocTypes";

// const getData = async () => {

// const patientsService = NodeIOCContainer.get<IPatientsService>(IOCServiceTypes.PatientsService);
// return await patientsService.list();

// const serv = NodeIOCContainer.get<IDbService>(IOCServiceTypes.DbService);
// const repo = await serv.patientsRepo();
// return await repo.find();


//     const dt = new DataSource(dbConfig);
//     return [];

// }

const PatientsPage = async ({ children }: PropsWithChildren) => {

    return (
        <>
            <h1>Pazienti</h1>
            <Patients />
        </>
    )
}

export default PatientsPage;