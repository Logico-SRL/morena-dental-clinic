import { inject, injectable } from "inversify";
import { Like, Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoProjToProj } from "../converters";

@injectable()
export class ProjectsService implements IProjectsService {

    private readonly dbService: IDbService;
    private get getRepo() { return this.dbService.projectsRepo() as Promise<Repository<ProjectEntity>> }

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    find = async (search: string) => {
        const repo = await this.getRepo;
        const resp = await repo.find({
            where: {
                'title': Like(`%${(search || '').toLowerCase()}%`)
            },
            // relations: {
            //     media: {
            //         source: true
            //     },
            //     tags: true
            // }
        });
        return resp ? resp.map(r => ({ ...repoProjToProj(r), type: 'project' as 'project' })) : [];
    }

    get = async (projectId: string) => {
        const repo = (await this.dbService.projectsRepo())
        const resp = await repo.findOne({
            where: {
                'id': projectId,
            },
            relations: {
                patient: true,
                category: true,
                subCategory: true,
                tags: true,
                visits: {
                    media: false,
                    //  {
                    //     source: true
                    // },
                    tags: true,

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
            relations: ['category', 'subCategory', 'patient', 'tags'],
            order: {
                'createdOn': 'DESC'
            }
        });

        return projs.map<IProject>(repoProjToProj)

    }
}

