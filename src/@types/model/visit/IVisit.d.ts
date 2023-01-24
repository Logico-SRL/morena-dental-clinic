type VisitEntity = import('../../../repository/entities/index').VisitEntity

type IVisit = Omit<VisitEntity, 'project' | 'media'> & {
    // project: IProject,
    media?: IMedia[]
}
