type MediaEntity = import('../../../repository/entities/index').MediaEntity

type IMedia = Omit<MediaEntity, 'visit'> & {
    visit: IVisit,
}
