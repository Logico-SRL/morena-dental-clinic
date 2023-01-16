import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { ProjectCategoryEntity } from "../../repository/entities/categories";

@injectable()
export class ProjectCategoriesService implements IProjectCategoriesService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    list = async () => {
        const repo = (await this.dbService.projectCategoriesRepo())

        const projCats = await repo.find({
            relations: ['parentCategory', 'childrenCategories']
        });

        return projCats.map<IProjectCategory>(repoProjCategoryToProjCategory)

    }
}

const repoProjCategoryToProjCategory = (p: ProjectCategoryEntity): IProjectCategory => {
    return {
        ...p
    }
}