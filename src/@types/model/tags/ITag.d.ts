type TagEntity = import('../../../repository/entities/index').TagEntity

type ITag = Omit<TagEntity, 'projects' | 'visits' | 'patients' | 'date'> & {
    date: Date | undefined,
    projects?: IProject[],
    visits?: IVisit[],
    patients?: IPatient[],
    pending?: boolean
}
