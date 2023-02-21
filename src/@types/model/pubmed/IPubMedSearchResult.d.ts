type IPubMedSearchResultResponse = {
    header: IPubMedResultHeader,
    esearchresult: IPubMedSearchResult
}

type IPubMedSummaryResultResponse = {
    header: IPubMedResultHeader,
    result: IPubMedSummaryResult
}

type IPubMedResponse = { search: IPubMedSearchResult } & { summary: IPubMedSummaryResult };

type IPubMedResultHeader = {
    type: string,
    version: string
}

type IPubMedSearchResult = {
    count: string,
    retmax: string,
    retstart: string,
    idlist: string[],
    translationset: {
        from: string,
        to: string
    }[],
    translationstack: ({ term: string, field: string, count: string, explode: string } | string)[],
    querytranslation: string
}

type IPubMedSummaryResult = {
    uids: string[],
    [key: string]: IPubMedSummary
}

type IPubMedSummary = {
    uid: string,
    pubdate: string,
    epubdate: string,
    source: string,
    authors: {
        name: string,
        authtype: string,
        clusterid: string
    }[],
    lastauthor: string,
    title: string,
    sorttitle: string,
    volume: string,
    issue: string,
    pages: string,
    lang: string[],
    nlmuniqueid: string,
    issn: string,
    essn: string,
    pubtype: string[],
    recordstatus: string,
    pubstatus: string,
    articleids: {
        idtype: string,
        idtypen: number,
        value: string
    }[],
    history: {
        pubstatus: string,
        date: string
    }[],
    references: unknown[],
    attributes: unknown[],
    pmcrefcount: string,
    fulljournalname: string,
    elocationid: string,
    doctype: string,
    srccontriblist: unknown[],
    booktitle: string,
    medium: string,
    edition: string,
    publisherlocation: string,
    publishername: string,
    srcdate: string,
    reportnumber: string,
    availablefromurl: string,
    locationlabel: string,
    doccontriblist: unknown[],
    docdate: string,
    bookname: string,
    chapter: string,
    sortpubdate: string,
    sortfirstauthor: string,
    vernaculartitle: string
}