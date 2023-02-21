export const defaultPatient = (id: string = ''): IPatient => ({
    id,
    firstName: '',
    familyName: '',
    fiscalCode: '',
    externalId: '',
    age: 0,
    gender: 'unknown',
    dateOfBirth: undefined,
    bloodGroup: '',
    emergencyPhone: '',
    notes: '',
    projects: [],
    tags: []
})