import { inject, injectable } from "inversify";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { repoLibraryToLibrary } from "../converters/repoLibraryToLibrary";

@injectable()
export class LibraryService implements ILibraryService {

    private readonly dbService: IDbService;
    private get getRepo() { return this.dbService.libraryRepo() as Promise<Repository<LibraryEntity>> }

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }

    public get = async () => {
        const repo = await this.getRepo;
        const founds = await repo.find({
            relations: [
                'projects',
                'macroProjects'
            ]
        })
        return founds.map(found => repoLibraryToLibrary(found));
    }

    private getOne = async (id: string) => {
        const repo = await this.getRepo;
        const found = await repo.findOne({
            where: {
                id
            },

            relations: [
                'projects',
                'macroProjects'
            ]
        })
        if (!found)
            throw new Error(`Library ${id} not found`);

        return repoLibraryToLibrary(found);
    }


    public add = async (item: ILibrary) => {
        const repo = await this.getRepo;
        if (!item.id)
            item.id = ulid();

        const it = await repo.create(item);
        await repo.save(it);
        return await this.getOne(item.id)
    }

    public remove = async (id: string) => {
        const repo = await this.getRepo;
        repo.delete({
            'id': id
        })
    }

    public save = async (id: string, item: ILibrary) => {
        const repo = await this.getRepo;
        repo.update({ id }, item);
        return item;
    }

}

