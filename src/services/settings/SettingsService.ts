import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { MediaSourceEntity } from "../../repository/entities";

@injectable()
export class SettingsService implements ISettingsService {

    private readonly dbService: IDbService;
    private get getMediaSourceRepo(): Promise<Repository<MediaSourceEntity>> { return this.dbService.mediaSourceRepo() }

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }
    getMediaSource = async (mediaSourceId: string) => {
        const repo = (await this.getMediaSourceRepo);
        const mediaSource = await repo.findOne({
            where: {
                id: mediaSourceId
            },
        });
        return mediaSource;
    }
    get = async () => {
        const repo = (await this.getMediaSourceRepo);
        const mediaSources = await repo.find();
        const resp: ISettings = { mediaSources }

        return resp;
    }

    createMediaSource = async (mediaSource: IMediaSource) => {
        const repo = (await this.getMediaSourceRepo);
        mediaSource.id = ulid();
        await repo.insert(mediaSource);
        return await this.get();
    }

    saveMediaSource = async (mediaSource: IMediaSource) => {
        const repo = (await this.getMediaSourceRepo);
        await repo.save(mediaSource);
        return await this.get();
    }
}