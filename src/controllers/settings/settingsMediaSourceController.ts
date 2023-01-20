import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class SettingsMediaSourceController extends BaseController {
    private settingsService: ISettingsService;


    constructor(@inject(IOCServiceTypes.SettingsService) serv: ISettingsService) {
        super();
        this.settingsService = serv;
    }


    POST = async () => {
        const source = this.req.body as IMediaSource;
        const result = await this.settingsService.createMediaSource(source);
        return this.res.status(200).json(result)
    }

    PUT = async () => {
        // const mediasourceId = this.req.query.mediasourceId as string;
        const source = this.req.body as IMediaSource;
        const result = await this.settingsService.saveMediaSource(source);
        return this.res.status(200).json(result)
    }



}