import dayjs from "dayjs";
import { inject, injectable } from "inversify";
import { Between, Equal, FindManyOptions, MoreThanOrEqual } from "typeorm";
import { ulid } from "ulid";
import { ages } from "../../configurations/ages";
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

    public list = async (params: IPatientSearchParams) => {

        const repo = (await this.dbService.patientsRepo())

        let opts: FindManyOptions<PatientEntity> = {
            where: {

            }
        }

        if (params.age) {
            const age = ages[params.age];

            opts.where = {
                ...opts.where,
                'age': age.query.to ? Between(age.query.from, age.query.to) : MoreThanOrEqual(age.query.from)
            }
        }

        if (params.gender) {

            opts.where = {
                ...opts.where,
                'gender': Equal(params.gender)
            }
        }

        const patEntities = await repo.find(opts);

        const patients = patEntities.map<IPatient>(repoPatientToPatient)

        return patients;

    }

}

export const repoPatientToPatient = (p: PatientEntity | undefined): IPatient => {
    const def: IPatient = {
        id: '',
        firstName: '',
        familyName: '',
        fiscalCode: '',
        externalId: '',
        age: 0,
        gender: 'unknown',
        dateOfBirth: undefined,
        bloodGroup: '',
        emergencyPhone: '',
        notes: '',
        projects: []
    }
    if (!p)
        return def;

    return {
        ...def,
        ...p,
        // id: p?.id || '',
        // firstName: p?.firstName || '',
        // familyName: p?.familyName || '',
        // fiscalCode: p?.fiscalCode || '',
        // externalId: p?.externalId || '',
        // age: p?.age || 0,
        gender: (p?.gender || 'unknown') as gendersKeysType,
        dateOfBirth: p?.dateOfBirth ? dayjs(p?.dateOfBirth) : undefined,
        // bloodGroup: p?.bloodGroup || '',
        // emergencyPhone: p?.emergencyPhone || '',
        // notes: p?.notes || '',
        // projects: p?.projects || []
    }
}