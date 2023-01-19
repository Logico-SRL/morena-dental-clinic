import { repoVisitToVisit } from ".";

export const repoMediaToMedia = (r: MediaEntity): IMedia => ({
    ...r,
    visit: repoVisitToVisit(r.visit)
})