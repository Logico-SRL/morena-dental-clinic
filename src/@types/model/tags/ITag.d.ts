type TagEntity = import('../../../repository/entities/index').TagEntity

type ITag = Omit<TagEntity, 'projects' | 'visits' | 'patients'> & {
    projects: IProject[],
    visits: IVisit[],
    patients: IPatient[]
}
