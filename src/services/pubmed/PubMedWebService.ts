import { inject, injectable } from "inversify";
import { xml2json } from 'xml-js';
import { IOCServiceTypes } from "../../inversify/iocTypes";

const baseSearchUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
const baseSummaryUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
const baseDetailUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'

@injectable()
export class PubMedWebService implements IPubMedWebService {

    private readonly httpService: IHttpService;

    constructor(@inject(IOCServiceTypes.HttpService) httpService: IHttpService) {
        this.httpService = httpService;
    }

    search = async (term: string, take: number, retstart: number, signal: AbortSignal) => {
        const params = new URLSearchParams();
        params.append('db', 'pubmed')
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

    getSummary = async (ids: string[], take: number, signal: AbortSignal): Promise<AxiosResponse<IPubMedSummaryResultResponse>> => {

        if (ids.length === 0) {
            return {
                data: {
                    result: {
                        uids: []
                    }
                }
            } as any
        }

        const params = new URLSearchParams();
        params.append('db', 'pubmed');
        params.append('retmode', 'json')
        params.append('retmax', take.toString())
        params.append('id', ids.join(','));
        return await this.httpService.get<IPubMedSummaryResultResponse>(`${baseSummaryUrl}?${params.toString()}`, { signal });
    }

    getDetail = async (id: string, signal: AbortSignal) => {
        const params = new URLSearchParams();
        params.append('db', 'pubmed');
        params.append('id', id);
        const res = await this.httpService.get<string>(`${baseDetailUrl}?${params.toString()}`,
            { signal, params: { format: "xml" }, responseType: 'text' },
            false);


        const converted: IPubMedDetail = JSON.parse(xml2json(res.data, { compact: true }));
        console.info('converted', converted)
        return converted;
    }


    get = async (id: string, signal: AbortSignal) => {
        const resp = await this.getDetail(id, signal);
        return resp ?? null;
    }


}

