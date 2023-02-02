import { processEnv } from "../processEnv";
import { AppUserEntity, MediaEntity, MediaSourceEntity, PatientEntity, ProjectCategoryEntity, ProjectEntity, TagEntity, VisitEntity } from "../repository/entities";


export const dbConfig = {
    type: processEnv().db.type as 'mssql',
    host: processEnv().db.host,
    username: processEnv().db.username,
    password: processEnv().db.password,
    database: processEnv().db.database,
    port: processEnv().db.port,
    synchronize: true,
    logging: false,
    entities: [
        AppUserEntity,
        PatientEntity,
        ProjectEntity,
        ProjectCategoryEntity,
        VisitEntity,
        MediaEntity,
        MediaSourceEntity,
        TagEntity],
    options: {
        encrypt: false
    },
};
