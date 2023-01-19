import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class VisitsController extends BaseController {
    private visitsService: IVisitsService;
    private get projectId() { return (this.req.query as { projectId: string }).projectId }


    constructor(@inject(IOCServiceTypes.VisitsService) serv: IVisitsService) {
        super();
        this.visitsService = serv;
    }

    // GET = async () => {
    //     const results = await this.projectsService.list();
    //     return this.res.status(200).json(results)
    // }

    POST = async () => {
        const visit = this.req.body as IVisit
        const result = await this.visitsService.create(this.projectId, visit);
        return this.res.status(200).json(result)
    }

}