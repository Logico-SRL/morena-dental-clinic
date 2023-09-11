type TagEntity = import('../../../repository/entities/index').TagEntity

type ITag = Omit<TagEntity, 'projects' | 'macroProjects' | 'visits' | 'patients' | 'date'> & {
    date: Date | undefined,
    projects?: IProject[],
    macroProjects?: IMacroProject[],
    visits?: IVisit[],
    patients?: IPatient[],
    pending?: boolean
}
