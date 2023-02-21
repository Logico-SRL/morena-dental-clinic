import { inject, injectable } from "inversify";
import type { IImpegniService } from "src/services/uno/impegni/IImpegniService";
import { IOCServiceTypes } from "../../../inversify/iocTypes";
import { BaseController } from "../../baseController";

@injectable()
export class AppointmentsController extends BaseController {
    private impegniService: IImpegniService;
    private get take() { return (this.req.query as unknown as { take: number }).take }
    //
    constructor(@inject(IOCServiceTypes.ImpegniService) serv: IImpegniService) {
        super();
        this.impegniService = serv;
    }
    GET = async () => {
        const take = this.take;
        const result = await this.impegniService.find(take)
        return this.res.status(200).json(result)
    }
}