import { useRef, useState } from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { useWebLogger } from "./useWebLogger";



export const usePubMed = () => {

    const logger = useWebLogger();
    const pubMedService = useService<IPubMedWebService>(IOCServiceTypes.PubMedService)

    const abortController = useRef<AbortController>()
    const [fetchingArticles, setFetchingArticles] = useState(false);

    const fetchArticles = async (term: string, take: number = 100, retstart: number = 0) => {

        if (abortController.current) {
            abortController.current.abort()
        }
        abortController.current = new AbortController();
        setFetchingArticles(true)
        let ret: IPubMedResponse = {
            search: {
                count: '0',
                retmax: take.toString(),
                retstart: retstart.toString(),
                idlist: [],
                translationset: [],
                translationstack: [],
                querytranslation: '',
            },
            summary: {
                uids: [] as any
            }
        }
        try {

            ret = await pubMedService.search(term, take, retstart, abortController.current.signal);

        } catch (ex: any) {
            logger.error('usePubMeds fetchArticles ex', ex)
        } finally {
            setFetchingArticles(false)
        }
        return ret;
    }

    return { fetchArticles, fetchingArticles };
}
