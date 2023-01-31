type FilePreviewServicePropsType =
    ({
        buffer: Buffer,
        type: 'image'
    }
        |
    {
        path: string,
        type: 'video',
        saveToDir: string,
        mediaId: string
    } |
    {
        path: string,
        type: 'doc',
    })


type IFilePreviewService = {
    getPreview: (params: FilePreviewServicePropsType) => Promise<SnapShotType[]>
}