type IExternalPatientsService = {
    searchFromUno: (params: IPatientSearchParams) => Promise<IExternalPatient[]>;
    getFromUno: (externalPatientId: string) => Promise<IExternalPatient[]>;
}