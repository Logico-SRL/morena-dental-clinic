import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoMacroProjToMacroProj } from "../converters/repoMacroProjToMacroProj";

@injectable()
export class MacroProjectsService implements IMacroProjectsService {

    private readonly dbService: IDbService;
    private get getRepo() { return this.dbService.macroProjectsRepo() as Promise<Repository<MacroProjectEntity>> }

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    find = async (search: string) => {
        throw new Error("not implemtented");

        // const repo = await this.getRepo;
        // const mode = 'IN BOOLEAN MODE';
        // const resp = await repo.createQueryBuilder().select()
        //     .where(`MATCH(title) AGAINST ('${search}*' ${mode})`)
        //     .orWhere(`MATCH(medicalHistory) AGAINST ('${search}*' ${mode})`)
        //     .orWhere(`MATCH(notes) AGAINST ('${search}*' ${mode})`)
        //     .getMany()


        // return resp ? resp.map(r => ({ ...repoProjToProj(r), type: 'project' as 'project' })) : [];
    }

    get = async (projectId: string) => {
        const repo = (await this.dbService.macroProjectsRepo())
        const resp = await repo.findOne({
            where: {
                'id': projectId,
            },
            relations: {
                notes: true,
                category: true,
                subCategory: true,
                projects: true,
                libraries: true
            }
        });
        // console.info('ProjectsService find resp', resp);
        return resp ? repoMacroProjToMacroProj(resp) : undefined;
    }
    save = async (project: IMacroProject) => {
        const repo = (await this.dbService.macroProjectsRepo())
        if (project.notes) {
            project.notes.forEach(note => {
                if (!note.id)
                    note.id = ulid();
            })
        }
        console.info('MacroProjectsService saving ', project);
        await repo.save(project);
        return await this.get(project.id) || project;
    }
    create = async (project: IMacroProject) => {
        const repo = (await this.dbService.macroProjectsRepo())
        project.id = ulid();
        project.createdOn = new Date();
        const toSave = repo.create(project);
        await repo.save(toSave);
        return project;
    }
    list = async () => {

        const repo = (await this.dbService.macroProjectsRepo())

        const projs = await repo.find({
            relations: ['category', 'subCategory', 'projects'],
            order: {
                'createdOn': 'DESC'
            }
        });

        return projs.map<IMacroProject>(repoMacroProjToMacroProj)

    }
}

