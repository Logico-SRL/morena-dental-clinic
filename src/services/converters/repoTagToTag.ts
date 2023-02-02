import { repoPatientToPatient, repoProjToProj, repoVisitToVisit } from ".";

export const repoTagToTag = (r: TagEntity): ITag => {
    const { tag, date, patients, projects, visits } = r;
    return {
        tag,
        date,
        patients: patients.map(p => repoPatientToPatient(p)),
        projects: projects.map(p => repoProjToProj(p)),
        visits: visits.map(v => repoVisitToVisit(v))
    }
}