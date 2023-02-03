import { repoPatientToPatient, repoVisitToVisit } from ".";
import { defaultProject } from "../defaultValues";
import { repoTagToTag } from "./repoTagToTag";

export const repoProjToProj = (p: ProjectEntity): IProject => {
    const def = defaultProject();
    return {
        ...def,
        ...p,
        category: p.category,
        subCategory: p.subCategory,
        patient: repoPatientToPatient(p.patient),
        visits: (p.visits || []).map(v => repoVisitToVisit(v)),
        tags: (p.tags || []).map(t => repoTagToTag(t, true))
    }
}