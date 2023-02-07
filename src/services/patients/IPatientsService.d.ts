type IPatientsService = {
    list: (params: IPatientSearchParams) => Promise<IPatient[]>;
    get: (patientId: string) => Promise<IPatient | undefined>;
    searchExternal: (params: IPatientSearchParams) => Promise<IPatient[]>;
    import: (externalPatient: IExternalPatient) => Promise<IPatient>;
    save: (patient: IPatient) => Promise<IPatient>;
    create: (patient: IPatient) => Promise<IPatient>;
    find: (search: string) => Promise<IPatientSearchResult[]>;
}