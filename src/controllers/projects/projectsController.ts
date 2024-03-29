import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class ProjectsController extends BaseController {
    private projectsService: IProjectsService;

    constructor(@inject(IOCServiceTypes.ProjectsService) serv: IProjectsService) {
        super();
        this.projectsService = serv;
    }

    GET = async () => {
        const results = await this.projectsService.list();
        return this.res.status(200).json(results)
    }

    POST = async () => {
        const proj = this.req.body as IProject
        const result = await this.projectsService.create(proj);
        return this.res.status(200).json(result)
    }

}