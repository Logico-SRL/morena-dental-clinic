type IMacroProjectsService = {

    list: () => Promise<IMacroProject[]>;
    get: (projectId: string) => Promise<IMacroProject | undefined>;
    save: (project: IMacroProject) => Promise<IMacroProject>;
    create: (project: IMacroProject) => Promise<IMacroProject>;
    find: (search: string) => Promise<IMacroProjectSearchResult[]>;
}