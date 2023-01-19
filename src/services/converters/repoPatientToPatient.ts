import dayjs from "dayjs";
import { repoProjToProj } from ".";

export const repoPatientToPatient = (p: PatientEntity | undefined): IPatient => {
    const def: IPatient = {
        id: '',
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
        projects: []
    }
    if (!p)
        return def;

    return {
        ...def,
        ...p,
        gender: (p?.gender || 'unknown') as gendersKeysType,
        dateOfBirth: p?.dateOfBirth ? dayjs(p?.dateOfBirth) : undefined,
        projects: p.projects.map(p => repoProjToProj(p))
    }
}