type ProjectEntity = import('../../../repository/entities/index').ProjectEntity

type IProject = Omit<ProjectEntity, 'category' | 'subCategory' | 'patient' | 'visits'> & {
    category?: IProjectCategory,
    subCategory?: IProjectCategory,
    patient: IPatient,
    visits?: IVisit[]
}
