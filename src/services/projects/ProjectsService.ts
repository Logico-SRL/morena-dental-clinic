import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoProjToProj } from "../converters";
import { stripNestedTags } from "../utils/stripNestedTags";

@injectable()
export class ProjectsService implements IProjectsService {

    private readonly dbService: IDbService;
    private get getRepo() { return this.dbService.projectsRepo() as Promise<Repository<ProjectEntity>> }

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    find = async (search: string) => {
        const repo = await this.getRepo;
        const mode = 'IN BOOLEAN MODE';
        // const mode = 'IN NATURAL LANGUAGE MODE';
        // const mode = 'IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION';
        const resp = await repo.createQueryBuilder().select()
            .where(`MATCH(title) AGAINST ('${search}*' ${mode})`)
            .orWhere(`MATCH(medicalHistory) AGAINST ('${search}*' ${mode})`)
            .orWhere(`MATCH(notes) AGAINST ('${search}*' ${mode})`)
            .getMany()

        // console.info('resp', resp)

        return resp ? resp.map(r => ({ ...repoProjToProj(r), type: 'project' as 'project' })) : [];
    }

    get = async (projectId: string) => {
        const repo = (await this.dbService.projectsRepo())
        const resp = await repo.findOne({
            where: {
                'id': projectId,
            },
            relations: {
                patient: {
                    tags: true
                },
                category: true,
                subCategory: true,
                tags: true,
                visits: {
                    media: false,
                    //  {
                    //     source: true
                    // },
                    tags: true,

                },
                libraries: {
                    macroProjects: true,
                    projects: true
                }
            }
        });
        // console.info('ProjectsService find resp', resp);
        return resp ? repoProjToProj(resp) : undefined;
    }
    save = async (project: IProject) => {
        const repo = (await this.dbService.projectsRepo())
        stripNestedTags(project);
        repo.save(project);
        return project;
    }
    create = async (project: IProject) => {
        const repo = (await this.dbService.projectsRepo())
        project.id = ulid();
        project.createdOn = new Date();
        stripNestedTags(project);
        const toSave = repo.create(project);
        await repo.save(toSave);
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

