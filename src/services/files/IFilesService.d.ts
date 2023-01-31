type IFilesService = {

    get: (path: string, options?: {
        encoding?: BufferEncoding | undefined;
        flag?: string | undefined;
    } | null) => string | Buffer
    delete: (path: string) => boolean,
    scan: (path: string) => Promise<IImportMedia[]>
    copy: (f: IImportMedia, dirTo: string, filenameTo: string) => Promise<boolean>

}