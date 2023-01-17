import { inject, injectable } from "inversify";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoPatientToPatient } from "../patients/PatientsService";

@injectable()
export class ProjectsService implements IProjectsService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }
    find = async (projectId: string) => {
        const repo = (await this.dbService.projectsRepo())
        const resp = await repo.findOne({
            where: {
                'id': projectId,
            },
            relations: ['patient', 'category', 'subCategory']
        });
        // console.info('ProjectsService find resp', resp);
        return resp ? repoProjToProj(resp) : undefined;
    }
    save = async (project: IProject) => {
        const repo = (await this.dbService.projectsRepo())
        repo.save(project);
        return project;
    }
    create = async (project: IProject) => {
        const repo = (await this.dbService.projectsRepo())
        project.id = ulid();
        repo.insert(project);
        return project;
    }
    list = async () => {
        const repo = (await this.dbService.projectsRepo())

        const projs = await repo.find({
            relations: ['category', 'subCategory', 'patient']
        });

        return projs.map<IProject>(repoProjToProj)

    }
}

const repoProjToProj = (p: ProjectEntity): IProject => {
    return {
        ...p,
        category: p.category,
        subCategory: p.subCategory,
        patient: repoPatientToPatient(p.patient)
    }
}