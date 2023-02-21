type IPubMedSearchResultResponse = {
    header: IPubMedSearchResultHeader,
    esearchresult: IPubMedSearchResult
}

type IPubMedSearchResultHeader = {
    type: string,
    version: string
}

type IPubMedSearchResult = {
    count: string,
    retmax: string,
    retstart: string,
    idlist: string[],
    translationset:
    {
        from: string,
        to: string
    }[],
    translationstack: ({ term: string, field: string, count: string, explode: string } | string)[],
    querytranslation: string
}