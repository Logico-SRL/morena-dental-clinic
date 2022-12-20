import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class PatientController extends BaseController {
    private patientsService: IPatientsService;

    constructor(@inject(IOCServiceTypes.PatientsService) serv: IPatientsService) {
        super();
        this.patientsService = serv;
    }

    GET = async () => {
        const { patientId } = this.req.query as { patientId: string }
        let result = await this.patientsService.find(patientId);
        return this.res.status(200).json(result)
    }
}