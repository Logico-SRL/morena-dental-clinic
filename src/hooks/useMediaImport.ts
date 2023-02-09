import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { useProject } from "./useProject";
import { useVisit } from "./useVisit";


export const useMediaImport = (projectId: string) => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const { selectedVisit } = useProject(projectId)
    const { addMediaToVisit } = useVisit(projectId, selectedVisit?.id || '')

    const importFiles = async (visit: IVisit, mediasource: IMediaSource, files: IImportMedia[]) => {
        const res = await httpService.post<IMedia[]>(`/api/protected/projects/${projectId}/visits/${visit.id}/mediasources/${mediasource.id}/import`, { files });
        res.data.forEach(f => {
            addMediaToVisit(f);
        })
    }

    return { importFiles };
}