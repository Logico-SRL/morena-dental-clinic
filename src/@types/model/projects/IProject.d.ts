type ProjectEntity = import('../../../repository/entities/index').ProjectEntity

type IProject = Omit<ProjectEntity, 'category' | 'subCategory' | 'patient' | 'visits' | 'tags' | 'libraries'> & {
    category?: IProjectCategory,
    subCategory?: IProjectCategory,
    patient: IPatient,
    visits?: IVisit[],
    tags: ITag[],
    libraries?: ILibrary[]
}
