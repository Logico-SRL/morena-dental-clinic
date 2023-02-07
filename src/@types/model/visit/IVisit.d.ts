type VisitEntity = import('../../../repository/entities/index').VisitEntity

type IVisit = Omit<VisitEntity, 'project' | 'media' | 'tags'> & {
    // project: IProject,
    projectId: string,
    media?: IMedia[],
    tags: ITag[]
}
