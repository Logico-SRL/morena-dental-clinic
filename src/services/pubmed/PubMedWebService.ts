import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'

@injectable()
export class PubMedWebService implements IPubMedWebService {

    private readonly httpService: IHttpService;

    constructor(@inject(IOCServiceTypes.HttpService) httpService: IHttpService) {
        this.httpService = httpService;
    }

    search = async (term: string, signal: AbortSignal) => {
        const params = new URLSearchParams();
        params.append('db', 'pmc')
        params.append('retmode', 'json')
        params.append('term', term)
        // ?db=pmc&term=eye
        const resp = await this.httpService.get<IPubMedSearchResultResponse>(`${baseUrl}?${params.toString()}`, { signal });
        return resp.data;
    }


}

