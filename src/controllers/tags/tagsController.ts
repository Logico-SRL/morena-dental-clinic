import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";


type QueryType = {
    search: string
}

@injectable()
export class TagsController extends BaseController {

    private tagsService: ITagsService;

    private get search() { return (this.req.query as QueryType).search }



    constructor(@inject(IOCServiceTypes.TagsService) serv: ITagsService) {
        super();
        this.tagsService = serv;
    }

    GET = async () => {
        const data = await this.tagsService.find(this.search)
        return this.res.status(200).json(data);
    }

}