import { inject, injectable } from "inversify";
import { Between, Equal, FindManyOptions, Like, MoreThanOrEqual, Repository } from "typeorm";
import { ulid } from "ulid";
import { ages } from "../../configurations/ages";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoPatientToPatient } from "../converters";

@injectable()
export class PatientsService implements IPatientsService {

    private readonly dbService: IDbService;
    private readonly externalPatientsService: IExternalPatientsService;
    private get getRepo() { return this.dbService.patientsRepo() as Promise<Repository<PatientEntity>> }

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

    find = async (search: string) => {
        const repo = await this.getRepo;
        const resp = await repo.find({
            where: {
                'firstName': Like(`%${(search || '').toLowerCase()}%`)
            },
            // relations: {
            //     media: {
            //         source: true
            //     },
            //     tags: true
            // }
        });
        return resp ? resp.map(r => ({ ...repoPatientToPatient(r), type: 'patient' as 'patient' })) : [];
    }

    public get = async (patientId: string) => {
        const repo = (await this.dbService.patientsRepo())
        const found = await repo.findOne({
            where: { 'id': patientId },
            relations: [
                'projects',
                'tags'
            ]
        });

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

        opts.relations = ['tags']

        const patEntities = await repo.find(opts);

        const patients = patEntities.map<IPatient>(repoPatientToPatient)

        return patients;
    }
}

