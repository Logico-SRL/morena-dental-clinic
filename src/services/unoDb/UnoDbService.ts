import { injectable } from "inversify";
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { unoDbConfig } from "../../db/unoDbConfig";
import { UnoModel } from "../../repository/unoEntities";

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
        return (await this.dataSource).getRepository(UnoModel.AAnagrafica);
    }
    impegniRepo = async () => {
        return (await this.dataSource).getRepository(UnoModel.AgImpegni);
    }
    postazioniRepo = async () => {
        return (await this.dataSource).getRepository(UnoModel.TabPostazioni)
    }
}