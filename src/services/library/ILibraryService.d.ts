type ILibraryService = {
    find: (search: string) => Promise<ISearchResult[]>
}