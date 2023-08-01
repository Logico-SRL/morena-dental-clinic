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
    }
        |
    {
        path: string,
        type: 'tac',
    })


type IFilePreviewService = {
    getPreview: (params: FilePreviewServicePropsType) => Promise<SnapShotType[]>
}