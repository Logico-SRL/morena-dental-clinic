type IPatientsService = {
    list: () => Promise<IPatient[]>;
    find: (patientId: string) => Promise<IPatient | undefined>;
    searchExternal: (params: IPatientSearchParams) => Promise<IPatient[]>;
    import: (externalPatient: IExternalPatient) => Promise<IPatient>;
    save: (patient: IPatient) => Promise<IPatient>;

}