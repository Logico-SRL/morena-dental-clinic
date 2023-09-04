import { processEnv } from "../processEnv";
import {
    AppUserEntity, MacroProjectEntity, MediaEntity, MediaSourceEntity, NoteEntity, PatientEntity,
    ProjectCategoryEntity, ProjectEntity, TagEntity, VisitEntity
} from "../repository/entities";


export const dbConfig = {
    type: processEnv().db.type as 'mysql',
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
        MacroProjectEntity,
        NoteEntity,
        ProjectCategoryEntity,
        VisitEntity,
        MediaEntity,
        MediaSourceEntity,
        TagEntity],
    options: {
        encrypt: false
    },
};
