import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

@injectable()
export class PatientsService implements IPatientsService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    public list = async () => {

        const repo = (await this.dbService.patientsRepo())
        const patEntities = await repo.find();

        const patients: IPatient[] = patEntities.map(p => ({
            id: p.id,
            name: p.name || ''
        }))

        return patients;

    }

}