import { processEnv } from "../processEnv";
import { UnoAnagraficaEntity } from "../repository/unoEntities";

export const unoDbConfig = {
    type: processEnv().unoDb.type as 'mssql',
    host: processEnv().unoDb.host,
    username: processEnv().unoDb.username,
    password: processEnv().unoDb.password,
    database: processEnv().unoDb.database,
    port: processEnv().unoDb.port,
    synchronize: false,
    logging: false,
    entities: [
        UnoAnagraficaEntity
    ],
    options: {
        encrypt: false
    },
};
