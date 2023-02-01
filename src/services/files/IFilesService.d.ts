type IFilesService = {

    get: (path: string, options?: {
        encoding?: BufferEncoding | undefined;
        flag?: string | undefined;
    } | null) => string | Buffer,
    stream: (path: string, options?: { start: number | undefined, end: number | undefined }) => ReadStream,
    delete: (path: string) => boolean,
    scan: (path: string) => Promise<IImportMedia[]>
    copy: (f: IImportMedia, dirTo: string, filenameTo: string) => Promise<boolean>

}