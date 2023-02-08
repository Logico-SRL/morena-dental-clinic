import ffmpeg from 'fluent-ffmpeg';
import { inject, injectable } from "inversify";
import path from "path";
import sharp from 'sharp';
import { IOCServiceTypes } from '../../inversify/iocTypes';
import { processEnv } from '../../processEnv';

@injectable()
export class FilePreviewService implements IFilePreviewService {

    private readonly fileService: IFilesService;

    constructor(@inject(IOCServiceTypes.FilesService) fileServ: IFilesService) {
        this.fileService = fileServ;
    }

    getPreview = async (params: FilePreviewServicePropsType) => {

        const snapshots: SnapShotType[] = []

        // let b64Thumbnail = '';
        // let b64Preview = '';

        switch (params.type) {
            case 'image': {

                const b64Thumbnail = await sharp(params.buffer)
                    .resize(processEnv().previews.thumbnailSize)
                    .png({ quality: processEnv().previews.quality })
                    .toBuffer()
                    .then(b => b.toString('base64'))
                    .catch(err => {
                        // reject(err);
                        throw err;

                    })

                const b64Preview = await sharp(params.buffer)
                    .resize(processEnv().previews.previewSize)
                    .png({ quality: processEnv().previews.quality })
                    .toBuffer()
                    .then(b => b.toString('base64'))
                    .catch(err => {
                        // reject(err);
                        throw err;
                    })
                snapshots.push({
                    b64Preview,
                    b64Thumbnail
                })
                break;
            }
            case 'video': {
                ffmpeg.setFfmpegPath(path.resolve('ffmpeg', 'ffmpeg.exe'));
                ffmpeg.setFfprobePath(path.resolve('ffmpeg', 'ffprobe.exe'));

                const timemarks = [0.1, 0.33, 0.66];
                // const timemarks = ['33%'];

                const done = await new Promise<boolean>(async (res, rej) => {


                    const secDuration = await new Promise<number>((res, rej) => {
                        ffmpeg(params.path).ffprobe((err, data) => {
                            // console.info('ffprobe err', err);
                            // console.info('ffprobe data', data);
                            res(data.format.duration || 0)
                        })
                    })

                    const inst = (isLast: boolean) => ffmpeg(params.path)
                        .on('start', function (cmd) {
                            console.log('Started ' + cmd);
                        })
                        .on('end', function () {
                            console.log('Screenshots taken');
                            isLast && res(true)
                        })
                        .on('error', function (err) {
                            console.error('ffmpeg error', err);
                            isLast && res(false)
                        });

                    timemarks.forEach((t, ind) => {
                        inst(ind == timemarks.length - 1)
                            .seekInput(Math.floor(t * secDuration))
                            .output(`${params.saveToDir}/${params.mediaId}_${ind + 1}.jpg`)
                            .outputOptions('-frames', '1')
                            .run()
                    })



                    // inst.run();
                    // .screenshots({
                    //     count: 3,
                    //     timemarks,
                    //     filename: `${params.mediaId}.jpg`,
                    //     folder: params.saveToDir,
                    // })
                }).catch(err => {
                    console.error('ffmpeg catched err', err);
                });



                if (done) {
                    console.info('fetching preview jpeg files');
                    await Promise.all(timemarks.map(async (mark, ind) => {
                        const filePreviewPath = `${params.saveToDir}/${params.mediaId}_${ind + 1}.jpg`
                        try {

                            const file = await this.fileService.get(filePreviewPath)
                            console.info(`file ${filePreviewPath} fetched`)

                            const b64Thumbnail = await sharp(file)
                                .resize(processEnv().previews.thumbnailSize)
                                .png({ quality: processEnv().previews.quality })
                                .toBuffer()
                                .then(b => b.toString('base64'))
                                .catch(err => {
                                    console.error('sharp 200 err', err)
                                    throw err;
                                })

                            const b64Preview = await sharp(file)
                                .resize(processEnv().previews.previewSize)
                                .png({ quality: processEnv().previews.quality })
                                .toBuffer()
                                .then(b => b.toString('base64'))
                                .catch(err => {
                                    // reject(err);
                                    console.error('sharp 1024 err', err)
                                    throw err;
                                })

                            snapshots.push({
                                b64Preview,
                                b64Thumbnail
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

        return snapshots;
    }



}

