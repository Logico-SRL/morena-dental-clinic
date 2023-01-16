import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class PatientController extends BaseController {
    private patientsService: IPatientsService;

    private get patientId() { return (this.req.query as { patientId: string }).patientId }

    constructor(@inject(IOCServiceTypes.PatientsService) serv: IPatientsService) {
        super();
        this.patientsService = serv;
    }

    GET = async () => {
        let result = await this.patientsService.find(this.patientId);
        return this.res.status(200).json(result)
    }

    PUT = async () => {
        const p = this.req.body as IPatient
        const ret = await this.patientsService.save(p);
        return this.res.status(200).json(ret)
    }

}