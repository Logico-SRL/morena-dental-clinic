type ILibraryService = {
    get: () => Promise<ILibrary[]>,
    add: (item: ILibrary) => Promise<ILibrary>,
    remove: (id: string) => Promise<void>,

}