import { processEnv } from "../processEnv";
import {
    UnoAnagraficaEntity,
    UnoAAnagraficaFamigliaEntity,
    UnoAAnagraficaIndirizziEntity,
    UnoTabComuniEntity
} from "../repository/unoEntities";


export const unoDbConfig = {
    type: processEnv().unoDb.type as 'mssql',
    host: processEnv().unoDb.host,
    username: processEnv().unoDb.username,
    password: processEnv().unoDb.password,
    database: processEnv().unoDb.database,
    port: processEnv().unoDb.port,
    synchronize: false,
    logging: true,
    entities: [
        UnoAnagraficaEntity,
        UnoAAnagraficaFamigliaEntity,
        UnoAAnagraficaIndirizziEntity,
        UnoTabComuniEntity
    ],
    options: {
        encrypt: false
    },
};
