import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

@injectable()
export class LibraryService implements ILibraryService {

    private readonly dbService: IDbService;
    private readonly patientsService: IPatientsService;
    private readonly projectsService: IProjectsService;
    private readonly visitsService: IVisitsService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService,
        @inject(IOCServiceTypes.PatientsService) patientsService: IPatientsService,
        @inject(IOCServiceTypes.ProjectsService) projectsService: IProjectsService,
        @inject(IOCServiceTypes.VisitsService) visitsService: IVisitsService) {
        this.dbService = dbService;
        this.patientsService = patientsService;
        this.projectsService = projectsService;
        this.visitsService = visitsService;
    }

    find = async (search: string) => {
        const res: ISearchResult[] = [];
        const patsRes = await this.patientsService.find(search)
        const projsRes = await this.projectsService.find(search)
        const visitsRes = await this.visitsService.find(search)

        patsRes.forEach(p => res.push({ ...p, type: 'patient' }))
        projsRes.forEach(p => res.push({ ...p, type: 'project' }))
        visitsRes.forEach(p => res.push({ ...p, type: 'visit' }))

        return res;
    }

}

