import Busboy, { FileInfo } from 'busboy';
import fs from 'fs';
import { inject, injectable } from "inversify";

import { Readable } from 'stream';
import { ulid } from 'ulid';
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";


type QueryType = {
    projectId: string
    visitId: string
    mediaSourceId: string
}

const TacStartRegex = /^(DICOMDIR|DICOMRM).*/
const TacRegex = /(DICOMDIR|DICOMRM).*/
const TacStartFileRegex = /^(DICOMDIR)/

@injectable()
export class FileUploadController extends BaseController {

    private get projectId() { return (this.req.query as QueryType).projectId }
    private get visitId() { return (this.req.query as QueryType).visitId }
    private get mediaSourceId() { return (this.req.query as QueryType).mediaSourceId }

    private readonly fileService: IFilesService;
    private readonly settingsService: ISettingsService;
    private readonly visitsServ: IVisitsService;
    private readonly mediaServ: IMediaService;
    private readonly filePreviewServ: IFilePreviewService;

    constructor(
        @inject(IOCServiceTypes.FilesService) fileServ: IFilesService,
        @inject(IOCServiceTypes.SettingsService) settingServ: ISettingsService,
        @inject(IOCServiceTypes.VisitsService) visitsServ: IVisitsService,
        @inject(IOCServiceTypes.MediaService) mediaServ: IMediaService,
        @inject(IOCServiceTypes.FilesPreviewService) filePreviewServ: IFilePreviewService,
    ) {
        super();
        this.fileService = fileServ;
        this.settingsService = settingServ;
        this.visitsServ = visitsServ;
        this.mediaServ = mediaServ;
        this.filePreviewServ = filePreviewServ
    }

    POST = async () => {
        // console.info(`API method: ${this.req.method}, query: ${JSON.stringify(this.req.query)} `)

        const mediaSource = await this.settingsService.getMediaSource(this.mediaSourceId);
        const visit = await this.visitsServ.get(this.visitId);

        if (!mediaSource) {
            throw new Error(`media source with id ${this.mediaSourceId} not found`);
        }
        if (!mediaSource.basePath) {
            throw new Error(`media source with id ${this.mediaSourceId} does not contain a basePath`);
        }
        if (!visit) {
            throw new Error(`visit with id ${this.visitId} not found`);
        }

        // const snapshots: SnapShotType[] = []

        const media: IMedia = {
            id: this.req.query['uploadId'] as string || ulid(),
            visit,
            source: mediaSource,
            b64Preview: '',
            b64Thumbnail: '',
            // type: 'image',
            createdOn: new Date(),
            // meta: '{}',
            path: '',
            encoding: '',
            filename: '',
            mimeType: ''
        }

        let fileExtension = 'notfound';

        const snapshots = await new Promise<SnapShotType[]>((resolve, reject) => {
            const busboy = Busboy({ headers: this.req.headers, preservePath: true });

            const chunks: Array<Uint8Array> = [];

            busboy.on('file', (fieldname: string, file: Readable, { encoding, filename, mimeType, ...rest }: FileInfo) => {

                file.on('error', ({ message }) => {
                    reject(new Error(`File upload error: ${message}`));
                })
                media.encoding = encoding;
                media.filename = filename;
                media.mimeType = mimeType;




                if (filename) {
                    const parts = filename.split('.');
                    if (parts)
                        fileExtension = parts[parts.length - 1];
                }

                const saveToDir = `${mediaSource.basePath}/${this.projectId}/${this.visitId}`;
                const saveTo = `${saveToDir}/${media.id}.${fileExtension}`;

                media.path = saveTo;

                fs.mkdirSync(saveToDir, { recursive: true });
                const stream = fs.createWriteStream(saveTo)
                file.pipe(stream)

                file.on('data', async (chunk: any) => {
                    chunks.push(chunk)
                });

                file.on('end', async () => {
                    // console.log('File [' + fieldname + '] Finished');

                    const buffer = Buffer.concat(chunks);

                    try {

                        const prev = await this.filePreviewServ.getPreview({
                            buffer,
                            mediaId: media.id,
                            path: saveTo,
                            saveToDir: saveToDir,
                            type: media.source?.type,
                        })
                        resolve(prev)
                    }
                    catch (err) {
                        reject(err)
                    }

                });
                // }

            });
            busboy.on('field', function (fieldname, val) {
                // console.log('Field [' + fieldname + ']: value: ' + inspect(val));
            });
            busboy.on('finish', function () {
                // console.log('Done parsing form!');
                // resolve(1);
            });
            this.req.pipe(busboy);
        });

        if (snapshots.length > 0) {

            media.b64Preview = snapshots[0].b64Preview;
            media.b64Thumbnail = snapshots[0].b64Thumbnail;
        }

        if (media.filename) {
            await this.mediaServ.create(media);
            this.res.status(200).send({ ...media, snapshots })
        } else {
            this.res.status(200).send(null);
        }
    }


}