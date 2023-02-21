type IPubMedWebService = {

    search: (term: string, signal: AbortSignal) => Promise<IPubMedSearchResultResponse>


}