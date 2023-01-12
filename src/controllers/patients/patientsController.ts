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
        let pars: IPatientSearchParams = this.req.query
        // console.info('pars.fromVisitDate', new Date(pars.fromVisitDate as any).getDate());
        if (pars.fromVisitDate) {
            pars.fromVisitDate = new Date(pars.fromVisitDate)
        }
        if (pars.toVisitDate) {
            pars.toVisitDate = new Date(pars.toVisitDate)
        }

        const results = await this.patientsService.list(pars);
        return this.res.status(200).json(results)
    }

    POST = async () => {
        const p = this.req.body as IPatient
        const ret = await this.patientsService.create(p);
        return this.res.status(200).json(ret)
    }

}