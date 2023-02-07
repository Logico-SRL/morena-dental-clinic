import { repoMediaToMedia } from ".";
import { defaultVisit } from "../defaultValues";
import { repoTagToTag } from "./repoTagToTag";


export const repoVisitToVisit = (r: VisitEntity | undefined): IVisit => {
    const def = defaultVisit();
    // console.info('repoVisitToVisit r.project', r?.project)
    return {
        ...def,
        ...r,
        projectId: r?.project ? r.project.id : '',
        // project: repoProjToProj(r.project),
        media: (r?.media || []).map(m => repoMediaToMedia(m)),
        tags: (r?.tags || []).map(t => repoTagToTag(t, true))
    }
}