type ISearchService = {
    find: (search: string) => Promise<ISearchResult[]>
}