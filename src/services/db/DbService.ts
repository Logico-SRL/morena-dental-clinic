import 'reflect-metadata'
import { injectable } from "inversify";
// import { defaultDataSource } from "../../db/dataSource";
import { dbConfig } from "../../db/dbConfig";
import { DataSource } from "typeorm";
import { PatientEntity } from '../../repository/entities/patient';
import { AppUserEntity } from '../../repository/entities/appUser';
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
        console.info('DbService constructor', dbConfig);
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
}