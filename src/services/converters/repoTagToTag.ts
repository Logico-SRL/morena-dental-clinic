import { repoPatientToPatient, repoProjToProj, repoVisitToVisit } from ".";
import { repoMacroProjToMacroProj } from "./repoMacroProjToMacroProj";

export const repoTagToTag = (r: TagEntity, skipRelations = false): ITag => {
    const { tag, date, patients, projects, visits, macroProjects } = r;
    // console.info('repoTagToTag', r);
    return {
        tag,
        date,
        patients: skipRelations ? [] : (patients || []).map(p => repoPatientToPatient(p)),
        projects: skipRelations ? [] : (projects || []).map(p => repoProjToProj(p)),
        visits: skipRelations ? [] : (visits || []).map(v => repoVisitToVisit(v)),
        macroProjects: skipRelations ? [] : (macroProjects || []).map(p => repoMacroProjToMacroProj(p)),
    }
}