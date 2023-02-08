import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


export const useTags = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const searchTags = async (search: string, signal?: AbortSignal) => {
        const pars = new URLSearchParams([['search', search]])
        return httpService.get<ITag[]>(`/api/protected/tags?${pars.toString()}`, { signal }).catch(err => ({ data: [] as ITag[] }))
    }

    const getTag = async (tag: string, signal?: AbortSignal) => {
        return httpService.get<ITag>(`/api/protected/tags/${encodeURIComponent(tag)}`, { signal }).catch(err => ({ data: undefined }))
    }

    return { searchTags, getTag };
}