import { statSync } from "fs";
import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

type QueryType = {
    mediaId: string
}

@injectable()
export class FileController extends BaseController {

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
        console.info(`API method: ${this.req.method}, query: ${JSON.stringify(this.req.query)} `)

        const media = await this.mediaServ.get(this.mediaId);
        if (!media) {
            throw new Error(`Media with id ${this.mediaId} not found`);
        }


        // console.info('media.source.type', media.source.type)
        if (media.mimeType.startsWith('video')) {
            const range = this.req.headers.range;
            console.info('requested range', range);
            if (!range) {
                return this.res.status(400).send("Requires Range header");
            }
            const videoSize = statSync(media.path).size;
            const CHUNK_SIZE = 10 * (10 ** 6);
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };
            this.res.writeHead(206, headers);
            const buff = await this.fileService.stream(media.path, { start, end });
            return buff.pipe(this.res);

        } else {
            const file = await this.fileService.get(media.path);
            this.res.setHeader('Content-Type', media.mimeType);
            // this.res.setHeader('Content-Disposition', 'attachment; filename=' + media.filename);
            this.res.setHeader('Content-Disposition', 'filename=' + media.filename);

            this.res.status(200).send(file);
        }

    }

    DELETE = async () => {

        const media = await this.mediaServ.get(this.mediaId);

        if (!media) {
            throw new Error(`Media with id ${this.mediaId} not found`);
        }

        await this.mediaServ.delete(this.mediaId);
        this.fileService.delete(media.path);

        this.res.status(200).send(true)
    }

    PUT = async () => {

        // console.info('this.req.body', this.req.body)
        const media = this.req.body as IMedia;

        if (!media) {
            throw new Error(`media not found in request body`);
        }
        const dbMedia = await this.mediaServ.get(media.id);

        if (!dbMedia) {
            throw new Error(`Media with id ${this.mediaId} not found`);
        }

        await this.mediaServ.save(media);

        this.res.status(200).send(media)
    }

}