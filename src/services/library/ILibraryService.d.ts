type ILibraryService = {
    get: () => Promise<ILibrary[]>,
    add: (item: ILibrary) => Promise<ILibrary>,
    save: (id: string, item: ILibrary) => Promise<ILibrary>,
    remove: (id: string) => Promise<void>,

}