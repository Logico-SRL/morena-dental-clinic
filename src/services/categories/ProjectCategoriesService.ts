import { inject, injectable } from "inversify";
import { IsNull } from "typeorm";
import { ulid } from "ulid";
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
            where: {
                parentCategory: IsNull()
            },
            relations: ['parentCategory', 'childrenCategories']
        });

        return projCats.map<IProjectCategory>(repoProjCategoryToProjCategory)

    }

    create = async (cat: IProjectCategory) => {
        const repo = (await this.dbService.projectCategoriesRepo())
        cat.id = ulid();
        if (!cat.childrenCategories) {
            cat.childrenCategories = []
        }
        repo.insert(cat);
        return cat;
    }
}

const repoProjCategoryToProjCategory = (p: ProjectCategoryEntity): IProjectCategory => {
    const def: IProjectCategory = {
        id: '',
        name: '',
        childrenCategories: []
    }
    return {
        ...def,
        ...p
    }
}