import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

@injectable()
export class PatientsService implements IPatientsService {

    private readonly dbService: IDbService;
    private readonly externalPatientsService: IExternalPatientsService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService,
        @inject(IOCServiceTypes.ExternalPatientsService) externalPatientsService: IExternalPatientsService) {
        this.dbService = dbService;
        this.externalPatientsService = externalPatientsService;
    }
    public import = async (externalPatientId: string) => {
        this.externalPatientsService.getFromUno(externalPatientId);
        throw new Error("not implemented");

    }

    public searchExternal = async (params: IPatientSearchParams) => {
        this.externalPatientsService.searchFromUno(params);
        throw new Error("not implemented");
    }

    public save = async (patient: IPatient) => {
        throw new Error("not implemented");

    }

    public find = async (patientId: string) => {
        throw new Error("not implemented");
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