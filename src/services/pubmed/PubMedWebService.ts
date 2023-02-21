import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

const baseSearchUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
const baseSummaryUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'

@injectable()
export class PubMedWebService implements IPubMedWebService {

    private readonly httpService: IHttpService;

    constructor(@inject(IOCServiceTypes.HttpService) httpService: IHttpService) {
        this.httpService = httpService;
    }

    search = async (term: string, take: number, retstart: number, signal: AbortSignal) => {
        const params = new URLSearchParams();
        params.append('db', 'pmc')
        params.append('retmode', 'json')
        params.append('retstart', retstart.toString())
        params.append('retmax', take.toString())
        params.append('term', term)
        // ?db=pmc&term=eye
        const searchResp = await this.httpService.get<IPubMedSearchResultResponse>(`${baseSearchUrl}?${params.toString()}`, { signal });
        const summResp = await this.getSummary(searchResp.data.esearchresult.idlist, take, signal)

        const { esearchresult } = searchResp.data
        const { result } = summResp.data

        const resp: IPubMedResponse = { search: esearchresult, summary: result }
        return resp;
        // return {...resp.data.esearchresult, ...summResp.data;
    }

    getSummary = async (ids: string[], take: number, signal: AbortSignal) => {
        const params = new URLSearchParams();
        params.append('db', 'pubmed');
        params.append('retmode', 'json')
        params.append('retmax', take.toString())
        params.append('id', ids.join(','));
        return await this.httpService.get<IPubMedSummaryResultResponse>(`${baseSummaryUrl}?${params.toString()}`, { signal });
        // console.info('getsummary', resp.data);
    }



}

