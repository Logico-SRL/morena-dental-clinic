type MacroProjectEntity = import('../../../repository/entities/index').MacroProjectEntity

type IMacroProject = Omit<MacroProjectEntity, 'category' | 'subCategory' | 'projects' | 'notes'> & {
    category?: IProjectCategory,
    subCategory?: IProjectCategory,
    projects?: IProject[],
    notes: INote[]
}
