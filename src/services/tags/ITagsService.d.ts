type ITagsService = {
    find: (search: string) => Promise<ITag[]>
    get: (tag: string) => Promise<ITag | undefined>

}