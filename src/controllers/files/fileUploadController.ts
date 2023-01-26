import Busboy, { FileInfo } from 'busboy';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { inject, injectable } from "inversify";
import path from 'path';
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

        const snapshots: SnapShotType[] = []

        const media: IMedia = {
            id: ulid(),
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

        let fileExtension = 'notfound'


        const files = await new Promise<{ b64Thumbnail: string, b64Preview: string }>((resolve, reject) => {
            const busboy = Busboy({ headers: this.req.headers });

            const chunks: Array<Uint8Array> = [];

            busboy.on('file', (fieldname: string, file: Readable, { encoding, filename, mimeType }: FileInfo) => {

                file.on('error', ({ message }) => {
                    throw new Error(`File upload error: ${message}`);

                })

                console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimeType,);

                media.encoding = encoding;
                media.filename = filename;
                media.mimeType = mimeType;

                // if (media.mimeType) {
                //     const p = media.mimeType.split('/')
                //     switch (p[0]) {
                //         case 'image':
                //         case 'video':
                //             media.type = p[0]
                //             break;

                //         default:
                //             media.type = 'doc'
                //             break;
                //     }
                // }

                if (filename) {
                    const parts = filename.split('.');
                    if (parts)
                        fileExtension = parts[parts.length - 1];
                }

                const saveToDir = `${mediaSource.basePath}/${this.projectId}/${this.visitId}`;
                const saveTo = `${saveToDir}/${media.id}.${fileExtension}`;
                media.path = saveTo;

                fs.mkdirSync(saveToDir, { recursive: true });

                console.info('saveTo', saveTo)
                const stream = fs.createWriteStream(saveTo)
                file.pipe(stream)

                file.on('data', async (chunk: any) => {
                    chunks.push(chunk)
                });

                file.on('end', async () => {
                    console.log('File [' + fieldname + '] Finished');

                    const buff = Buffer.concat(chunks);

                    let b64Thumbnail = '';
                    let b64Preview = '';

                    switch (media.source.type) {
                        case 'image': {

                            b64Thumbnail = await sharp(buff)
                                .resize(200)
                                .toBuffer()
                                .then(b => b.toString('base64'))
                                .catch(err => {
                                    reject(err);
                                    throw err;

                                })
                            b64Preview = await sharp(buff)
                                .resize(1024)
                                .toBuffer()
                                .then(b => b.toString('base64'))
                                .catch(err => {
                                    reject(err);
                                    throw err;
                                })
                            break;
                        }
                        case 'video': {
                            ffmpeg.setFfmpegPath(path.resolve('ffmpeg', 'ffmpeg.exe'));
                            ffmpeg.setFfprobePath(path.resolve('ffmpeg', 'ffprobe.exe'));
                            const timemarks = ['0%', '33%', '66%'];

                            const done = await new Promise<boolean>(async (res, rej) => {

                                // const wStream = new Transform()
                                ffmpeg(media.path)
                                    .on('start', function (cmd) {
                                        console.log('Started ' + cmd);
                                    })
                                    .on('end', function () {
                                        console.log('Screenshots taken');
                                        res(true)
                                    })
                                    .on('error', function (err) {
                                        console.error('ffmpeg error', err);
                                        res(false)
                                    })
                                    .screenshots({
                                        count: 3,
                                        timemarks,
                                        filename: `${media.id}.jpg`,
                                        folder: saveToDir,
                                    })
                            });



                            if (done) {
                                await Promise.all(timemarks.map(async (mark, ind) => {
                                    const filePreviewPath = `${saveToDir}/${media.id}_${ind + 1}.jpg`
                                    try {

                                        const file = await this.fileService.get(filePreviewPath)
                                        console.info(`file ${filePreviewPath} fetched`)

                                        const thumb = await sharp(file)
                                            .resize(200)
                                            .toBuffer()
                                            .then(b => b.toString('base64'))
                                            .catch(err => {
                                                reject(err);
                                            })

                                        const prev = await sharp(file)
                                            .resize(1024)
                                            .toBuffer()
                                            .then(b => b.toString('base64'))
                                            .catch(err => {
                                                reject(err);
                                            })
                                        snapshots.push({
                                            b64Preview: prev || '',
                                            b64Thumbnail: thumb || ''
                                        })
                                    } catch (err) {
                                        console.error(`FileUploadController file ${filePreviewPath}`, err);
                                    }
                                }));
                            }

                            break;
                        }
                        case 'doc':
                        default: {

                            break;
                        }

                    }


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


        this.res.status(200).send({ ...media, snapshots })
    }


}