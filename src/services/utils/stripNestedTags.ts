type WithTags = {
    tags: ITag[]
}
export const stripNestedTags = (item: WithTags) => {
    if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
            tag.patients = undefined;
            tag.projects = undefined;
            tag.visits = undefined;
        })
    }
}