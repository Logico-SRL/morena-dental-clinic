import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


export const useTags = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const getTags = async (search: string, signal?: AbortSignal) => {
        const pars = new URLSearchParams([['search', search]])
        return httpService.get<ITag[]>(`/api/protected/tags?${pars.toString()}`, { signal })
    }

    return { getTags };
}