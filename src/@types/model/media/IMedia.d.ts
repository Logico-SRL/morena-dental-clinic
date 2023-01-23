type MediaEntity = import('../../../repository/entities').MediaEntity

type IMedia = Omit<MediaEntity, 'visit'> & {
    visit: IVisit,
}
