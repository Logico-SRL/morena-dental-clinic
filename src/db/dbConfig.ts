// import 'server-only';
import { processEnv } from "../processEnv";
import { AppUserEntity } from "../repository/entities/appUser";
import { PatientEntity } from "../repository/entities/patient";

export const dbConfig = {
    type: processEnv().db.type as 'mssql',
    host: processEnv().db.host,
    username: processEnv().db.username,
    password: processEnv().db.password,
    database: processEnv().db.database,
    port: processEnv().db.port,
    synchronize: true,
    logging: false,
    entities: [AppUserEntity, PatientEntity],
    options: {
        encrypt: false
    },
};
