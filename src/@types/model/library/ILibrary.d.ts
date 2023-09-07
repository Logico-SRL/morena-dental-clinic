type LibraryEntity = import('../../../repository/entities/index').LibraryEntity

type ILibrary = Omit<LibraryEntity, 'projects' | 'macroProjects'> & {
    projects?: IProject[],
    macroProjects?: IMacroProject[],
}
