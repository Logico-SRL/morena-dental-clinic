import Busboy, { FileInfo } from 'busboy';
import { inject, injectable } from "inversify";
import { Readable } from 'stream';
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
export class FileThumbnailsController extends BaseController {


    private readonly filePreviewServ: IFilePreviewService;

    constructor(
        @inject(IOCServiceTypes.FilesPreviewService) filePreviewServ: IFilePreviewService,
    ) {
        super();
        this.filePreviewServ = filePreviewServ
    }

    POST = async () => {
        console.info(`API method: ${this.req.method}, query: ${JSON.stringify(this.req.query)} `)

        const snapshot = await new Promise<SnapShotType>((resolve, reject) => {
            const busboy = Busboy({ headers: this.req.headers });

            const chunks: Array<Uint8Array> = [];

            busboy.on('file', (fieldname: string, file: Readable, { encoding, filename, mimeType }: FileInfo) => {

                file.on('error', ({ message }) => {
                    throw new Error(`File upload error: ${message}`);

                })

                console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimeType,);

                file.on('data', async (chunk: any) => {
                    chunks.push(chunk)
                });

                file.on('end', async () => {
                    console.log('File [' + fieldname + '] Finished');

                    const buffer = Buffer.concat(chunks);

                    if (mimeType.startsWith('image')) {
                        const snapshots = await this.filePreviewServ.getPreview({
                            type: 'image',
                            buffer
                        })

                        if (snapshots.length > 0) {
                            resolve({
                                b64Preview: snapshots[0].b64Preview,
                                b64Thumbnail: snapshots[0].b64Thumbnail,
                            })
                        }
                    } else {
                        resolve({
                            b64Preview: '',
                            b64Thumbnail: '',
                        })
                    }
                    // resolve(b64File);
                });
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

        this.res.status(200).send(snapshot)
    }


}