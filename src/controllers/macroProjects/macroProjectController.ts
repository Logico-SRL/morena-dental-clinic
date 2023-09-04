import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class MacroProjectController extends BaseController {
    private macroProjectsService: IMacroProjectsService;

    private get projectId() { return (this.req.query as { projectId: string }).projectId }

    constructor(@inject(IOCServiceTypes.MacroProjectsService) serv: IMacroProjectsService) {
        super();
        this.macroProjectsService = serv;
    }


    GET = async () => {
        const result = await this.macroProjectsService.get(this.projectId);
        return this.res.status(200).json(result)
    }

    PUT = async () => {
        const proj = this.req.body as IMacroProject
        const result = await this.macroProjectsService.save(proj);
        return this.res.status(200).json(result)
    }

}