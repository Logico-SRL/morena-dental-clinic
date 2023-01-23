import { inject, injectable } from "inversify";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoProjToProj } from "../converters";

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
            relations: {
                patient: true,
                category: true,
                subCategory: true,
                visits: {
                    media: {
                        source: true
                    }
                }
            }
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
        project.createdOn = new Date();
        repo.insert(project);
        return project;
    }
    list = async () => {
        const repo = (await this.dbService.projectsRepo())

        const projs = await repo.find({
            relations: ['category', 'subCategory', 'patient'],
            order: {
                'createdOn': 'DESC'
            }
        });

        return projs.map<IProject>(repoProjToProj)

    }
}

