import dayjs from "dayjs";
import { repoProjToProj } from ".";
import { defaultPatient } from "../defaultValues";

export const repoPatientToPatient = (p: PatientEntity | undefined): IPatient => {
    const def = defaultPatient();

    if (!p)
        return def;

    return {
        ...def,
        ...p,
        gender: (p?.gender || 'unknown') as gendersKeysType,
        dateOfBirth: p?.dateOfBirth ? dayjs(p?.dateOfBirth) : undefined,
        projects: (p.projects || []).map(p => repoProjToProj(p))
    }
}