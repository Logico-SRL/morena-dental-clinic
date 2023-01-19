import { injectable } from "inversify";
import 'reflect-metadata';
// import { defaultDataSource } from "../../db/dataSource";
import { DataSource } from "typeorm";
import { dbConfig } from "../../db/dbConfig";
import { AppUserEntity, PatientEntity, ProjectCategoryEntity, ProjectEntity } from '../../repository/entities';
// import { AppUserEntity } from "../../repository/entities/appUser";
// import { PatientEntity } from "../../repository/entities/patient";



@injectable()
export class DbService implements IDbService {

    private readonly _dataSource: DataSource;

    private get dataSource(): Promise<DataSource> {
        return new Promise(async (res) => {

            if (!this._dataSource.isInitialized) {
                await this._dataSource.initialize();
            }
            res(this._dataSource)
        })
    }

    constructor() {
        this._dataSource = new DataSource(dbConfig);
    }


    // private dataSource = (): Promise<DataSource> => {


    //     throw new Error(" not implemented");
    //     // return defaultDataSource();
    // }

    usersRepo = async () => {
        return (await this.dataSource).getRepository(AppUserEntity);
    }

    patientsRepo = async () => {
        return (await this.dataSource).getRepository(PatientEntity);
    }

    projectCategoriesRepo = async () => {
        return (await this.dataSource).getRepository(ProjectCategoryEntity);
    }

    projectsRepo = async () => {
        return (await this.dataSource).getRepository(ProjectEntity);
    }
}