import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


export const useTags = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const getTags = async (search: string) => {
        return httpService.get<ITag[]>(`/api/protected/tags?search=${search}`)
    }

    return { getTags };
}