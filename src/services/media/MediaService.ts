import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { IOCServiceTypes } from "../../inversify/iocTypes";

@injectable()
export class MediaService implements IMediaService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }
    get = async (mediaId: string) => {
        const repo: Repository<MediaEntity> = (await this.dbService.mediaRepo())
        return await repo.findOne({
            where: {
                id: mediaId
            }
        })
    }
    delete = async (mediaId: string) => {
        const repo: Repository<MediaEntity> = (await this.dbService.mediaRepo())
        const res = await repo.delete({
            id: mediaId
        })
        return !!res.affected
    }

    create = async (media: IMedia) => {
        const repo: Repository<MediaEntity> = (await this.dbService.mediaRepo())
        repo.insert(media);
        return media;
    }

    save = async (media: IMedia) => {
        const repo: Repository<MediaEntity> = (await this.dbService.mediaRepo())
        repo.save(media);
        return media;
    }
}

