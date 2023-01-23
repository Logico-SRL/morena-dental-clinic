import Busboy, { FileInfo } from 'busboy';
import fs from 'fs';
import { inject, injectable } from "inversify";
import sharp from 'sharp';
import { Readable } from 'stream';
import { ulid } from 'ulid';
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";
// type FileObjType = {
//     filename: string,
//     encoding: string,
//     mimeType: string
// }
type QueryType = {
    projectId: string
    visitId: string
    mediaSourceId: string
}

@injectable()
export class FileUploadController extends BaseController {

    private get projectId() { return (this.req.query as QueryType).projectId }
    private get visitId() { return (this.req.query as QueryType).visitId }
    private get mediaSourceId() { return (this.req.query as QueryType).mediaSourceId }

    private readonly fileService: IFilesService;
    private readonly settingsService: ISettingsService;
    private readonly visitsServ: IVisitsService
    private readonly mediaServ: IMediaService

    constructor(
        @inject(IOCServiceTypes.FilesService) fileServ: IFilesService,
        @inject(IOCServiceTypes.SettingsService) settingServ: ISettingsService,
        @inject(IOCServiceTypes.VisitsService) visitsServ: IVisitsService,
        @inject(IOCServiceTypes.MediaService) mediaServ: IMediaService,
    ) {
        super();
        this.fileService = fileServ;
        this.settingsService = settingServ;
        this.visitsServ = visitsServ;
        this.mediaServ = mediaServ;
    }

    POST = async () => {
        console.info(`API method: ${this.req.method}, query: ${JSON.stringify(this.req.query)} `)

        const mediaSource = await this.settingsService.getMediaSource(this.mediaSourceId);
        const visit = await this.visitsServ.find(this.visitId);


        if (!mediaSource) {
            throw new Error(`media source with id ${this.mediaSourceId} not found`);
        }
        if (!mediaSource.basePath) {
            throw new Error(`media source with id ${this.mediaSourceId} does not contain a basePath`);
        }
        if (!visit) {
            throw new Error(`visit with id ${this.visitId} not found`);
        }

        const media: IMedia = {
            id: ulid(),
            visit,
            source: mediaSource,
            b64Preview: '',
            b64Thumbnail: '',
            type: 'image',
            createdOn: new Date(),
            // meta: '{}',
            path: '',
            encoding: '',
            filename: '',
            mimeType: ''
        }

        // const fileId = ulid();
        let fileExtension = 'notfound'

        // const mimeInfo: FileInfo = {
        //     encoding: '',
        //     filename: '',
        //     mimeType: ''
        // }

        const files = await new Promise<{ b64Thumbnail: string, b64Preview: string }>((resolve) => {
            // let b64File = '';
            const busboy = Busboy({ headers: this.req.headers });
            // console.log(JSON.stringify(req.headers, null, 2));

            // let fileData: any[] = [];
            const chunks: Array<Uint8Array> = [];

            busboy.on('file', (fieldname: string, file: Readable, { encoding, filename, mimeType }: FileInfo) => {

                console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimeType,);

                media.encoding = encoding;
                media.filename = filename;
                media.mimeType = mimeType;

                if (media.mimeType) {
                    const p = media.mimeType.split('/')
                    switch (p[0]) {
                        case 'image':
                        case 'video':
                            media.type = p[0]
                            break;

                        default:
                            media.type = 'doc'
                            break;
                    }
                }

                if (filename) {
                    const parts = filename.split('.');
                    if (parts)
                        fileExtension = parts[parts.length - 1];
                }

                const saveToDir = `${mediaSource.basePath}/${this.projectId}/${this.visitId}`;
                const saveTo = `${saveToDir}/${media.id}.${fileExtension}`;
                media.path = saveTo;

                fs.mkdir(saveToDir, { recursive: true }, (err) => {
                    if (err) throw err;
                });

                console.info('saveTo', saveTo)
                const stream = fs.createWriteStream(saveTo)
                file.pipe(stream)

                file.on('data', async (chunk: any) => {
                    // console.log('File [' + fieldname + '] got ' + chunk.length + ' bytes');
                    // fileData = fileData.concat(...data)
                    chunks.push(chunk)
                    // fileData = [chunk]
                });

                file.on('end', async () => {
                    console.log('File [' + fieldname + '] Finished');

                    const buff = Buffer.concat(chunks);
                    // const buffer = Buffer.from(buff.toString('base64'), 'base64');

                    // console.info('buffer length', buffer.length)
                    //console.info('media.path', media.path)

                    // const u8 = new Uint8Array(fileData);
                    // console.log(`fileData length: ${fileData.length}, u8: ${u8.length}`);

                    // b64File = Buffer.from(u8).toString('base64');
                    const b64Thumbnail = await sharp(buff)
                        .resize(200)
                        .toBuffer()
                        .then(b => b.toString('base64'))
                    // const b64Thumbnail = '';

                    // const b64Preview = '';
                    const b64Preview = await sharp(buff)
                        .resize(1024)
                        .toBuffer()
                        .then(b => b.toString('base64'))


                    resolve({ b64Thumbnail, b64Preview })

                    // resolve(b64File);
                });
            });
            busboy.on('field', function (fieldname, val) {
                // console.log('Field [' + fieldname + ']: value: ' + inspect(val));
            });
            busboy.on('finish', function () {
                console.log('Done parsing form!');
                // resolve(1);
            });
            this.req.pipe(busboy);
        });

        media.b64Preview = files.b64Preview;
        media.b64Thumbnail = files.b64Thumbnail;

        await this.mediaServ.create(media);

        this.res.status(200).send(media)
    }


}