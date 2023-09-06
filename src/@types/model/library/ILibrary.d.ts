type LibraryEntity = import('../../../repository/entities/index').LibraryEntity

type ILibrary = Omit<LibraryEntity> & {
    projects?: IProject[],
    macroProjects?: IProject[],
}
