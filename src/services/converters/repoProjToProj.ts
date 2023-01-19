import { repoPatientToPatient } from "."

export const repoProjToProj = (p: ProjectEntity): IProject => {
    return {
        ...p,
        category: p.category,
        subCategory: p.subCategory,
        patient: repoPatientToPatient(p.patient)
    }
}