type VisitPropType = {
    sources: IMediaSource[],
    selectedVisit: IVisit | undefined,
    segmentValue: string | number,
    onSourceChange: (mediaSourceId: string | number) => void,
    selectedMediaSource?: IMediaSource,
    projectId: string,
    setSelectedVisit: (visit: IVisit | undefined) => void
}