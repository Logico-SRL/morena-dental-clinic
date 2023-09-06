import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";


type QueryType = {
    search: string
}

@injectable()
export class SearchController extends BaseController {

    private libraryService: ISearchService;

    private get search() { return (this.req.query as QueryType).search }



    constructor(@inject(IOCServiceTypes.SearchService) serv: ISearchService) {
        super();
        this.libraryService = serv;
    }

    GET = async () => {
        const data = await this.libraryService.find(this.search)
        return this.res.status(200).json(data);
    }

}