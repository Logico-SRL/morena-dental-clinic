import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { VisitEntity } from "../../repository/entities";
import { repoVisitToVisit } from "../converters";
import { stripNestedTags } from "../utils/stripNestedTags";

@injectable()
export class VisitsService implements IVisitsService {

    private readonly dbService: IDbService;
    private get getRepo() { return this.dbService.visitsRepo() as Promise<Repository<VisitEntity>> }

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }
    get = async (visitId: string) => {
        const repo = await this.getRepo;
        const resp = await repo.findOne({
            where: {
                'id': visitId,
            },
            relations: {
                media: {
                    source: true
                },
                tags: true,
                project: true
            }
        });
        return resp ? repoVisitToVisit(resp) : undefined;
    }
    find = async (search: string) => {
        const repo = await this.getRepo;

        const resp = await repo.createQueryBuilder('visit').select()
            .leftJoinAndSelect('visit.project', 'project')
            .where(`MATCH(visit.title) AGAINST ('${search}*' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(visit.diagnosis) AGAINST ('${search}*' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(visit.treatment) AGAINST ('${search}*' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(visit.followup) AGAINST ('${search}*' IN BOOLEAN MODE)`)
            .getMany()

        // const resp = await repo.find({
        //     where: {
        //         'title': Like(`%${(search || '').toLowerCase()}%`)
        //     },
        //     relations: {
        //         //     media: {
        //         //         source: true
        //         //     },
        //         //     tags: true
        //         project: true
        //     }
        // });
        return resp ? resp.map(r => ({ ...repoVisitToVisit(r), type: 'visit' as 'visit' })) : [];
    }
    save = async (projectId: string, visit: IVisit) => {
        const repo = await this.getRepo;
        const v = visit as any;
        v.project = {
            id: projectId
        }
        stripNestedTags(v);
        repo.save(visit);
        return visit;
    }
    create = async (projectId: string, visit: IVisit) => {
        const repo = await this.getRepo;
        const v = visit as any;
        v.project = {
            id: projectId
        }
        visit.id = ulid();
        visit.createdOn = new Date();
        stripNestedTags(visit);
        repo.insert(visit);
        return visit;
    }
    delete = async (visitId: string) => {
        const repo = await this.getRepo;
        const result = await repo.delete({
            'id': visitId
        });
        return !!result.affected
    }
}

