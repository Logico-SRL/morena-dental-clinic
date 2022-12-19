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
        let results = await this.patientsService.list();
        return this.res && this.res.status(200).json(results)
    }

}