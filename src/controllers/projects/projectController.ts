import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class ProjectController extends BaseController {
    private projectsService: IProjectsService;

    private get projectId() { return (this.req.query as { projectId: string }).projectId }

    constructor(@inject(IOCServiceTypes.ProjectsService) serv: IProjectsService) {
        super();
        this.projectsService = serv;
    }



    GET = async () => {
        const result = await this.projectsService.find(this.projectId);
        return this.res.status(200).json(result)
    }

}