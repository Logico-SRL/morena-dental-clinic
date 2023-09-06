
export const repoLibraryToLibrary = (r: LibraryEntity, skipRelations = false): ILibrary => {
    const { id, pubMedId, title, author, abstract, json, macroProjects, projects } = r;
    // console.info('repoTagToTag', r);
    return {
        id, pubMedId, title, author, abstract, json
    }
}