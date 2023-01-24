import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class VisitController extends BaseController {
    private visitsService: IVisitsService;

    private get projectId() { return (this.req.query as { projectId: string }).projectId }
    private get visitId() { return (this.req.query as { visitId: string }).visitId }


    constructor(@inject(IOCServiceTypes.VisitsService) serv: IVisitsService) {
        super();
        this.visitsService = serv;
    }

    GET = async () => {
        const result = await this.visitsService.find(this.visitId);
        return this.res.status(200).json(result)
    }

    PUT = async () => {
        const visit = this.req.body as IVisit
        const result = await this.visitsService.save(this.projectId, visit);
        return this.res.status(200).json(result)
    }

    DELETE = async () => {
        const result = await this.visitsService.delete(this.visitId);
        return this.res.status(200).json(result)
    }

}