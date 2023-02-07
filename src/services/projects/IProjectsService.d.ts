type IProjectsService = {

    list: () => Promise<IProject[]>;
    get: (projectId: string) => Promise<IProject | undefined>;
    // searchExternal: (params: IPatientSearchParams) => Promise<IPatient[]>;
    // import: (externalPatient: IExternalPatient) => Promise<IPatient>;
    save: (project: IProject) => Promise<IProject>;
    create: (project: IProject) => Promise<IProject>;
    find: (search: string) => Promise<IProjectSearchResult[]>;
}