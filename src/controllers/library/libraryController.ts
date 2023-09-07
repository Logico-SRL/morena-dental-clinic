import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";


type QueryType = {
    search: string
}

@injectable()
export class LibraryController extends BaseController {

    private libraryService: ILibraryService;


    constructor(@inject(IOCServiceTypes.LibraryService) serv: ILibraryService) {
        super();
        this.libraryService = serv;
    }

    GET = async () => {
        const data = await this.libraryService.get();
        return this.res.status(200).json(data);
    }

    POST = async () => {
        const item: ILibrary = this.req.body;
        const data = await this.libraryService.add(item);
        return this.res.status(200).json(data);
    }

    DELETE = async () => {
        const ids = this.req.query['id'] as string[];
        if (ids.length > 0) {
            await this.libraryService.remove(ids[0]);
        }
        return this.res.status(200).json({});
    }

    PUT = async () => {
        const item: ILibrary = this.req.body;
        const ids = this.req.query['id'] as string[];
        if (item && ids.length > 0) {
            await this.libraryService.save(ids[0], item);
        }
        return this.res.status(200).json(item);
    }

}