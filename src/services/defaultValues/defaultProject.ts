import { defaultPatient } from ".";

export const defaultProject = (): IProject => ({
    id: '',
    visits: [],
    createdOn: new Date(),
    medicalHistory: '',
    notes: '',
    title: '',
    patient: defaultPatient(),
    tags: [],
})
