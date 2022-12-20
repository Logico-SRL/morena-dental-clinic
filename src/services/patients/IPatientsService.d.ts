type IPatientsService = {
    list: () => Promise<IPatient[]>;
    find: (patientId: string) => Promise<IPatient>;
    searchExternal: (params: IPatientSearchParams) => Promise<IPatient[]>;
    import: (externalPatientId: string) => Promise<IPatient>;
    save: (patient: IPatient) => Promise<IPatient>;

}