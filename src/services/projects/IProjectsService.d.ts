type IProjectsService = {

    list: () => Promise<IProject[]>;
    get: (projectId: string) => Promise<IProject | undefined>;
    save: (project: IProject) => Promise<IProject>;
    create: (project: IProject) => Promise<IProject>;
    find: (search: string) => Promise<IProjectSearchResult[]>;
}