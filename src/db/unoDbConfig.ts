import { processEnv } from "../processEnv";
import { UnoModelEntities } from "../repository/unoEntities";

export const unoDbConfig = {
    type: processEnv().unoDb.type as 'mssql',
    host: processEnv().unoDb.host,
    username: processEnv().unoDb.username,
    password: processEnv().unoDb.password,
    database: processEnv().unoDb.database,
    port: processEnv().unoDb.port,
    synchronize: false,
    logging: false, //processEnv().currentEnvName === 'development',
    entities: UnoModelEntities,
    options: {
        encrypt: false,
        readOnlyIntent: true
    },
};
