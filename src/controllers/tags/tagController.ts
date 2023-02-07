import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";


type QueryType = {
    tagId: string
}

@injectable()
export class TagController extends BaseController {

    private tagsService: ITagsService;

    private get tagId() { return (this.req.query as QueryType).tagId }



    constructor(@inject(IOCServiceTypes.TagsService) serv: ITagsService) {
        super();
        this.tagsService = serv;
    }

    GET = async () => {
        // console.info('TagController')
        const data = await this.tagsService.get(this.tagId)
        return this.res.status(200).json(data);
    }

}