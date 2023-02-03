import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoVisitToVisit } from "../converters";

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
                tags: true
            }
        });
        return resp ? repoVisitToVisit(resp) : undefined;
    }
    save = async (projectId: string, visit: IVisit) => {
        const repo = await this.getRepo;
        const v = visit as any;
        v.project = {
            id: projectId
        }
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

