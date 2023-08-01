import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

type QueryType = {
    mediaId: string
}

@injectable()
export class FileDownloadController extends BaseController {

    private get mediaId() { return (this.req.query as QueryType).mediaId }

    private readonly fileService: IFilesService;
    private readonly mediaServ: IMediaService

    constructor(
        @inject(IOCServiceTypes.FilesService) fileServ: IFilesService,
        @inject(IOCServiceTypes.MediaService) mediaServ: IMediaService,
    ) {
        super();
        this.fileService = fileServ;
        this.mediaServ = mediaServ;
    }

    GET = async () => {
        // console.info(`API method: ${this.req.method}, query: ${JSON.stringify(this.req.query)} `)

        const media = await this.mediaServ.get(this.mediaId);
        if (!media) {
            throw new Error(`Media with id ${this.mediaId} not found`);
        }

        const file = await this.fileService.get(media.path);
        this.res.setHeader('Content-Type', media.mimeType);
        this.res.setHeader('Content-Disposition', 'filename=' + media.filename);
        this.res.status(200).send(file);



    }


}