import { repoMediaToMedia } from ".";

export const repoVisitToVisit = (r: VisitEntity): IVisit => ({
    ...r,
    // project: repoProjToProj(r.project),
    media: (r.media || []).map(m => repoMediaToMedia(m))
})