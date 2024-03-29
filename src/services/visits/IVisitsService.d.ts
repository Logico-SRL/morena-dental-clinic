type IVisitsService = {

    get: (visitId: string) => Promise<IVisit | undefined>;
    save: (projectId: string, visit: IVisit) => Promise<IVisit>;
    create: (projectId: string, visit: IVisit) => Promise<IVisit>;
    delete: (visitId: string) => Promise<boolean>;
    find: (search: string) => Promise<IVisitSearchResult[]>;

}