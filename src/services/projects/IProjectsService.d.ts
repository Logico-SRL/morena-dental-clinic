type IProjectsService = {

    list: () => Promise<IProject[]>;
    // find: (patientId: string) => Promise<IPatient | undefined>;
    // searchExternal: (params: IPatientSearchParams) => Promise<IPatient[]>;
    // import: (externalPatient: IExternalPatient) => Promise<IPatient>;
    // save: (patient: IPatient) => Promise<IPatient>;
    // create: (patient: IPatient) => Promise<IPatient>;

}