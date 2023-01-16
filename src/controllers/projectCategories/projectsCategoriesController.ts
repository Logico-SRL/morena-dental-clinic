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

}