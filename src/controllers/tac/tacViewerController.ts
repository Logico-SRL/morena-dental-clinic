import { exec } from 'child_process';
import { inject, injectable } from "inversify";
import path from 'path';
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

type QueryType = {
    mediaId: string
}

@injectable()
export class TacViewerController extends BaseController {

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

        const media = await this.mediaServ.get(this.mediaId);
        if (!media) {
            throw new Error(`Media with id ${this.mediaId} not found`);
        }

        const p = path.resolve(media.path)
        console.info('opening ', p);
        exec(`D:\\Temp\\Morena\\s4viewer\\Viewer\\ExhalationB.exe -notagview -title "${media.filename}" "${p}"`);

        // start cmd.exe /K node my-new-script.js parm1 parm2

        //macos
        // osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'


        this.res.status(200).send('ok');

    }

}