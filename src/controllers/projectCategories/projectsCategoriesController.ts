import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class ProjectsCategoriesController extends BaseController {
    private projectCategoriesService: IProjectCategoriesService;

    constructor(@inject(IOCServiceTypes.ProjectCategoriesService) serv: IProjectCategoriesService) {
        super();
        this.projectCategoriesService = serv;
    }

    GET = async () => {
        const results = await this.projectCategoriesService.list();
        return this.res.status(200).json(results)
    }

    POST = async () => {
        const cat = this.req.body as IProjectCategory
        const results = await this.projectCategoriesService.create(cat);
        return this.res.status(200).json(results)
    }

}