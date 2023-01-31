import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


export const useMedia = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const deleteMedia = async (mediaId: string) => {
        return httpService.delete<IVisit>(`/api/protected/media/${mediaId}`)
    }

    const updateMedia = async (media: IMedia) => {
        return httpService.put<IVisit>(`/api/protected/media/${media.id}`, media)
    }

    const searchNewMedia = async (mediasource: IMediaSource) => {
        return httpService.get<IImportMedia[]>(`/api/protected/mediasources/${mediasource.id}`)
    }

    return { deleteMedia, updateMedia, searchNewMedia };
}