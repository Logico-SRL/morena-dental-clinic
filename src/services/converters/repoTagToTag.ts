import { repoPatientToPatient, repoProjToProj, repoVisitToVisit } from ".";

export const repoTagToTag = (r: TagEntity, skipRelations = false): ITag => {
    const { tag, date, patients, projects, visits } = r;
    // console.info('repoTagToTag', r);
    return {
        tag,
        date,
        patients: skipRelations ? [] : (patients || []).map(p => repoPatientToPatient(p)),
        projects: skipRelations ? [] : (projects || []).map(p => repoProjToProj(p)),
        visits: skipRelations ? [] : (visits || []).map(v => repoVisitToVisit(v))
    }
}