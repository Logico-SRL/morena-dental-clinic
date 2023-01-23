import { existsSync, readFileSync } from "fs";
import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

@injectable()
export class FilesService implements IFilesService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    get = (path: string) => {
        if (!existsSync(path)) {
            throw new Error(`File ${path} does not exist`);
        }
        return readFileSync(path)
    }

}

