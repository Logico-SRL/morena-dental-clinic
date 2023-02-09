import { inject, injectable } from "inversify";
import { Between, Equal, Like, MoreThanOrEqual, Repository } from "typeorm";
import { ulid } from "ulid";
import { ages } from "../../configurations/ages";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoPatientToPatient } from "../converters";
import { stripNestedTags } from "../utils/stripNestedTags";

@injectable()
export class PatientsService implements IPatientsService {

    private readonly dbService: IDbService;
    private readonly externalPatientsService: IExternalPatientsService;
    private get repo() { return this.dbService.patientsRepo() as Promise<Repository<PatientEntity>> }

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
        stripNestedTags(patient);
        return await repo.save(patient);
    }

    public create = async (patient: IPatient) => {
        const repo = (await this.dbService.patientsRepo())
        patient.id = ulid()
        stripNestedTags(patient);
        const toSave = repo.create(patient);
        await repo.save(toSave);
        return patient
    }

    find = async (search: string) => {
        const repo = await this.repo;
        const resp = await repo.createQueryBuilder().select()
            .where(`MATCH(firstName) AGAINST ('${search}*' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(familyName) AGAINST ('${search}*' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(notes) AGAINST ('${search}*' IN BOOLEAN MODE)`)
            .getMany()
        // const resp = await repo.find({
        //     where: {
        //         'firstName': Like(`%${(search || '').toLowerCase()}%`)
        //     },
        //     // relations: {
        //     //     media: {
        //     //         source: true
        //     //     },
        //     //     tags: true
        //     // }
        // });
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

        const repo = await this.repo

        const builder = repo.createQueryBuilder('patient')
            .leftJoinAndSelect('patient.tags', 'tags');

        if (params.age) {
            const age = ages[params.age];
            builder.andWhere({ 'age': age.query.to ? Between(age.query.from, age.query.to) : MoreThanOrEqual(age.query.from) })
        }

        if (params.gender) {
            builder.andWhere({ 'gender': Equal(params.gender) })
        }

        if (params.nameSurname) {
            builder
                .andWhere([{ 'firstName': Like(`%${params.nameSurname}%`) }, { 'familyName': Like(`%${params.nameSurname}%`) }])
        }

        console.info('builder.getQuery()', builder.getQuery());

        const patEntities = await builder.getMany();

        const patients = patEntities.map<IPatient>(repoPatientToPatient)

        return patients;
    }
}

