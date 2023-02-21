import { injectable } from "inversify";
import 'reflect-metadata';
import { DataSource, Repository } from "typeorm";
import { unoDbConfig } from "../../db/unoDbConfig";
import { UnoAnagraficaEntity, UnoAAnagraficaFamigliaEntity, UnoAgImpegni, UnoTabPostazioni } from "../../repository/unoEntities";

@injectable()
export class UnoDbService implements IUnoDbService {

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
        this._dataSource = new DataSource(unoDbConfig);
    }

    anagraficaRepo = async () => {
        return (await this.dataSource).getRepository(UnoAnagraficaEntity);
    }
    impegniRepo = async () => {
        return (await this.dataSource).getRepository(UnoAgImpegni);
    }
    postazioniRepo = async () => {
        return (await this.dataSource).getRepository(UnoTabPostazioni)
    }
}