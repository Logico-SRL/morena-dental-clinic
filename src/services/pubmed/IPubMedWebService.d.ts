type IPubMedWebService = {

    search: (term: string, take: number, retstart: number, signal: AbortSignal) => Promise<IPubMedResponse>
    get: (uid: string, signal: AbortSignal) => Promise<IPubMedDetail | null>


}