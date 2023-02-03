import { repoMediaToMedia } from ".";
import { defaultVisit } from "../defaultValues";
import { repoTagToTag } from "./repoTagToTag";


export const repoVisitToVisit = (r: VisitEntity | undefined): IVisit => {
    const def = defaultVisit();
    return {
        ...def,
        ...r,
        // project: repoProjToProj(r.project),
        media: (r?.media || []).map(m => repoMediaToMedia(m)),
        tags: (r?.tags || []).map(t => repoTagToTag(t, true))
    }
}