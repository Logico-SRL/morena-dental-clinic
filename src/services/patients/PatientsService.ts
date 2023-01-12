import { inject, injectable } from "inversify";
import { ulid } from "ulid";
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
    public import = async (externalPatient: IExternalPatient) => {
        // this.externalPatientsService.getFromUno(externalPatientId);
        throw new Error("not implemented");

    }


    public searchExternal = async (params: IPatientSearchParams) => {
        this.externalPatientsService.searchFromUno(params);
        throw new Error("not implemented");
    }

    public save = async (patient: IPatient) => {
        const repo = (await this.dbService.patientsRepo())
        return await repo.save(patient);
    }

    public create = async (patient: IPatient) => {
        const repo = (await this.dbService.patientsRepo())
        patient.id = ulid()
        await repo.insert(patient);
        return patient
    }

    public find = async (patientId: string) => {
        const repo = (await this.dbService.patientsRepo())
        const found = await repo.findOneBy({ 'id': patientId });
        if (found)
            return repoPatientToPatient(found);
        else
            throw new Error(`patient ${patientId} not found`);

    }

    public list = async () => {

        const repo = (await this.dbService.patientsRepo())
        const patEntities = await repo.find();

        const patients = patEntities.map<IPatient>(repoPatientToPatient)

        return patients;

    }

}

const repoPatientToPatient = (p: PatientEntity): IPatient => {
    return {
        id: p.id,
        firstName: p.firstName || '',
        familyName: p.familyName || '',
        fiscalCode: p.fiscalCode || '',
        externalId: p.externalId || '',
    }
}