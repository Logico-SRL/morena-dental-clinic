import { DataSourceOptions } from "typeorm";
import { processEnv } from "../processEnv";
import { AppUserEntity } from "../repository/entities/appUser";

export const dbConfig: DataSourceOptions = {
    type: processEnv().db.type as 'mssql',
    host: processEnv().db.host,
    username: processEnv().db.username,
    password: processEnv().db.password,
    database: processEnv().db.database,
    port: processEnv().db.port,
    synchronize: true,
    logging: false,
    entities: [AppUserEntity],
    options: {
        encrypt: false
    },
};

console.info('dbConfig', dbConfig)