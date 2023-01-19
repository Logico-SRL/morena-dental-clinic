import { processEnv } from "../processEnv";
import { AppUserEntity, PatientEntity, ProjectCategoryEntity, ProjectEntity } from "../repository/entities";


export const dbConfig = {
    type: processEnv().db.type as 'mssql',
    host: processEnv().db.host,
    username: processEnv().db.username,
    password: processEnv().db.password,
    database: processEnv().db.database,
    port: processEnv().db.port,
    synchronize: true,
    logging: false,
    entities: [AppUserEntity, PatientEntity, ProjectEntity, ProjectCategoryEntity],
    options: {
        encrypt: false
    },
};
