import { inject, injectable } from "inversify";
import { Like, Repository } from "typeorm";
import { IOCServiceTypes } from "../../../inversify/iocTypes";
import { UnoAnagraficaEntity } from '../../../repository/unoEntities/index'
import { IAnagraficasService } from "./IAnagraficasService";

@injectable()
export class AnagraficasService implements IAnagraficasService {

    private readonly unoDbService: IUnoDbService;

    private get getRepo() { return this.unoDbService.anagraficaRepo() as Promise<Repository<UnoAnagraficaEntity>> }

    constructor(@inject(IOCServiceTypes.UnoDbService) UnoDbService: IUnoDbService) {
        this.unoDbService = UnoDbService;
    }

    find = async (searchParams: IUnoAnagraficaSearchParams) => {
        const repo = await this.getRepo;
        const res = await repo.find({
            where: {
                'nome': Like(`%${(searchParams.nome || '').toLowerCase()}%`),
                'cognome': Like(`%${(searchParams.cognome || '').toLowerCase()}%`),
                'codiceFiscale': Like(`%${(searchParams.codiceFiscale || '').toLowerCase()}%`)
            }
        })
        return res;
    }
}