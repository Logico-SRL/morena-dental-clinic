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

    public add = async (item: ILibrary) => {
        const repo = await this.getRepo;
        item.id = ulid();
        const it = repo.create(item);
        repo.save(it);
        return repoLibraryToLibrary(it);
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

