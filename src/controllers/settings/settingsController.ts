import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class SettingsController extends BaseController {
    private settingsService: ISettingsService;


    constructor(@inject(IOCServiceTypes.SettingsService) serv: ISettingsService) {
        super();
        this.settingsService = serv;
    }

    GET = async () => {
        const result = await this.settingsService.get();
        return this.res.status(200).json(result)
    }

}