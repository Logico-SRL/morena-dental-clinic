import { repoPatientToPatient, repoVisitToVisit } from "."

export const repoProjToProj = (p: ProjectEntity): IProject => {

    return {
        ...p,
        category: p.category,
        subCategory: p.subCategory,
        patient: repoPatientToPatient(p.patient),
        visits: (p.visits || []).map(v => repoVisitToVisit(v))
    }
}