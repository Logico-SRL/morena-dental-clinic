type IProjectCategoriesService = {
    list: () => Promise<IProjectCategory[]>
    // list: (params: IPatientSearchParams) => Promise<IPatient[]>;
    // find: (patientId: string) => Promise<IPatient | undefined>;
    // searchExternal: (params: IPatientSearchParams) => Promise<IPatient[]>;
    // import: (externalPatient: IExternalPatient) => Promise<IPatient>;
    // save: (patient: IPatient) => Promise<IPatient>;
    create: (cat: IProjectCategory) => Promise<IProjectCategory>;

}