import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

@injectable()
export class ProjectCategoriesService implements IProjectCategoriesService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    list = async () => {
        throw new Error("not implemented");
    }
}