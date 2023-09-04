import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class MacroProjectsController extends BaseController {
    private macroProjectsService: IMacroProjectsService;

    constructor(@inject(IOCServiceTypes.MacroProjectsService) serv: IMacroProjectsService) {
        super();
        this.macroProjectsService = serv;
    }

    GET = async () => {
        const results = await this.macroProjectsService.list();
        return this.res.status(200).json(results)
    }

    POST = async () => {
        const proj = this.req.body as IMacroProject
        const result = await this.macroProjectsService.create(proj);
        return this.res.status(200).json(result)
    }

}