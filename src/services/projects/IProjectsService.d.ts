type IVisitsService = {

    // list: () => Promise<IVisit[]>;
    find: (visitId: string) => Promise<IVisit | undefined>;
    // // searchExternal: (params: IPatientSearchParams) => Promise<IPatient[]>;
    // // import: (externalPatient: IExternalPatient) => Promise<IPatient>;
    save: (projectId: string, visit: IVisit) => Promise<IVisit>;
    create: (projectId: string, visit: IVisit) => Promise<IVisit>;

}