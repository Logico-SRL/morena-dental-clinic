import { inject, injectable } from "inversify";
import { Like, Repository } from "typeorm";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { TagEntity } from "../../repository/entities";
import { repoTagToTag } from "../converters/repoTagToTag";

@injectable()
export class TagsService implements ITagsService {

    private readonly dbService: IDbService;
    private get getRepo() { return this.dbService.tagsRepo() as Promise<Repository<TagEntity>> }

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    find = async (search: string) => {
        const repo = await this.getRepo;
        const res = await repo.find({
            where: {
                'tag': Like(`%${(search || '').toLowerCase()}%`)
            },
            // relations: ['patients', 'projects', 'visits']
        })

        return res.map(r => repoTagToTag(r));
    }

    get = async (tag: string) => {
        const repo = await this.getRepo;
        const res = await repo.findOne({
            where: {
                'tag': tag
            },
            relations: [
                'patients',
                'projects',
                'visits'
            ]
        })

        return res ? repoTagToTag(res) : undefined;
    }

}

