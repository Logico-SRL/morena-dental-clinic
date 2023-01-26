type Dispatch<T> = import('react').Dispatch<T>;
type SetStateAction<T> = import('react').SetStateAction<T>;

type VisitPropType = {
    sources: IMediaSource[],
    selectedVisit: IVisit | undefined,
    segmentValue: string | number,
    onSourceChange: (mediaSourceId: string | number) => void,
    selectedMediaSource?: IMediaSource,
    projectId: string,
    // setSelectedVisit: Dispatch<SetStateAction<IVisit>>,
    setSelectedVisit: (visit: IVisit | undefined) => void,
    isDeleting: boolean,
    setIsDeleting: (val: boolean) => void
}

type UploadMediaResp = IMedia & { snapshots?: SnapShotType[] }

type SnapShotType = Pick<IMedia, 'b64Preview' | 'b64Thumbnail'>