type IAppointment = Omit<UnoAgImpegniEntity, 'tipoImpegno' | 'categoria' | 'colore' | 'idPostazione' | 'statoRecord'> & {
    patient: IPatient,
    tipoImpegno: IConfiguredValue,
    categoria: IConfiguredValue,
    colore: IConfiguredValue,
    idPostazione: IConfiguredValue,
    statoRecord: IConfiguredValue,

}

