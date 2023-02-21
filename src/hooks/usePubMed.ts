import { useRef } from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";



export const usePubMed = () => {
    const pubMedService = useService<IPubMedWebService>(IOCServiceTypes.PubMedService)

    const abortController = useRef<AbortController>()

    const fetchArticles = async (term: string) => {
        if (abortController.current) {
            abortController.current.abort()
        }
        abortController.current = new AbortController();

        return await pubMedService.search(term, abortController.current.signal);
    }

    return { fetchArticles };
}
