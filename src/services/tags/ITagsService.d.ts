type ITagsService = {
    find: (search: string) => Promise<ITag[]>

}