type VisitEntity = import('../../../repository/entities/index').VisitEntity

type IVisit = Omit<VisitEntity, 'project' | 'media' | 'tags'> & {
    // project: IProject,
    media?: IMedia[],
    tags: ITag[]
}
