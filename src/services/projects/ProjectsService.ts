import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoPatientToPatient } from "../patients/PatientsService";

@injectable()
export class ProjectsService implements IProjectsService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
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
        subcategory: p.subCategory,
        patient: repoPatientToPatient(p.patient)
    }
}