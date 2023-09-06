import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


export const useSearch = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const searchEntities = async (search: string, signal?: AbortSignal) => {
        const pars = new URLSearchParams([['search', search]])
        return httpService.get<ISearchResult[]>(`/api/protected/search?${pars.toString()}`, { signal }).catch(err => ({ data: [] as ISearchResult[] }))
    }

    return { searchEntities };
}