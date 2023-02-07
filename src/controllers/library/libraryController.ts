import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";


type QueryType = {
    search: string
}

@injectable()
export class LibraryController extends BaseController {

    private libraryService: ILibraryService;

    private get search() { return (this.req.query as QueryType).search }



    constructor(@inject(IOCServiceTypes.LibraryService) serv: ILibraryService) {
        super();
        this.libraryService = serv;
    }

    GET = async () => {
        const data = await this.libraryService.find(this.search)
        return this.res.status(200).json(data);
    }

}