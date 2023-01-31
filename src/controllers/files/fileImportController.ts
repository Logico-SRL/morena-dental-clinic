import { inject, injectable } from "inversify";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

type QueryType = {
    projectId: string
    visitId: string
    mediaSourceId: string

}

@injectable()
export class FileImportController extends BaseController {

    private get projectId() { return (this.req.query as QueryType).projectId }
    private get visitId() { return (this.req.query as QueryType).visitId }
    private get mediaSourceId() { return (this.req.query as QueryType).mediaSourceId }

    private readonly fileService: IFilesService;
    private readonly mediaServ: IMediaService
    private readonly settingsServ: ISettingsService
    private readonly visitsServ: IVisitsService;

    constructor(
        @inject(IOCServiceTypes.FilesService) fileServ: IFilesService,
        @inject(IOCServiceTypes.MediaService) mediaServ: IMediaService,
        @inject(IOCServiceTypes.SettingsService) settingsServ: ISettingsService,
        @inject(IOCServiceTypes.VisitsService) visitsServ: IVisitsService,
    ) {
        super();
        this.fileService = fileServ;
        this.mediaServ = mediaServ;
        this.settingsServ = settingsServ;
        this.visitsServ = visitsServ;
    }

    GET = async () => {
        const mediaSource = await this.settingsServ.getMediaSource(this.mediaSourceId);
        if (!mediaSource) {
            throw new Error(`Media source ${this.mediaSourceId} not found`);
        }
        if (!mediaSource.baseSearch) {
            throw new Error(`Media source ${this.mediaSourceId} wihtout baseSearch`);
        }

        const files = await this.fileService.scan(mediaSource.baseSearch)
        this.res.status(200).send(files)
    }

    POST = async () => {
        const mediaSource = await this.settingsServ.getMediaSource(this.mediaSourceId);
        if (!mediaSource) {
            throw new Error(`Media source ${this.mediaSourceId} not found`);
        }
        const visit = await this.visitsServ.get(this.visitId);

        if (!visit) {
            throw new Error(`visit with id ${this.visitId} not found`);
        }
        const { files } = this.req.body as { files: IImportMedia[] }

        const addedMedia: IMedia[] = []

        await Promise.all(files.map(async f => {

            const id = ulid()
            const saveToDir = `${mediaSource.basePath}/${this.projectId}/${this.visitId}`;
            const saveTo = `${saveToDir}/${id}${f.ext}`;

            const media: IMedia = {
                id,
                visit,
                source: mediaSource,
                b64Preview: '',
                b64Thumbnail: '',
                createdOn: new Date(),
                path: saveTo,
                encoding: '',
                filename: f.filename,
                mimeType: ''
            }

            await this.fileService.copy(f, saveToDir, `${id}${f.ext}`);
            addedMedia.push(await this.mediaServ.create(media));

        }));


        this.res.status(200).send(addedMedia)
    }


}