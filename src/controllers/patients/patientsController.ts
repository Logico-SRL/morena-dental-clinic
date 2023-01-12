import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class PatientsController extends BaseController {
    private patientsService: IPatientsService;

    constructor(@inject(IOCServiceTypes.PatientsService) serv: IPatientsService) {
        super();
        this.patientsService = serv;
    }

    GET = async () => {
        const results = await this.patientsService.list();
        return this.res.status(200).json(results)
    }

    POST = async () => {
        const p = this.req.body as IPatient
        const ret = await this.patientsService.create(p);
        return this.res.status(200).json(ret)
    }

}