type ProjectEntity = import('../../../repository/entities/index').ProjectEntity

type IProject = Omit<ProjectEntity, 'category' | 'subcategory' | 'patient'> & {
    category?: IProjectCategory,
    subcategory: IProjectCategory,
    patient: IPatient
}
