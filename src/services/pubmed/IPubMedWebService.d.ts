type IPubMedWebService = {

    search: (term: string, take: number, retstart: number, signal: AbortSignal) => Promise<IPubMedResponse>


}