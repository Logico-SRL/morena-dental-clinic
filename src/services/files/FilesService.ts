import { constants, copyFileSync, createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync } from "fs";
import { inject, injectable } from "inversify";
import mime from 'mime-types';
import { extname } from "path";
import { IOCServiceTypes } from "../../inversify/iocTypes";
@injectable()
export class FilesService implements IFilesService {

    private readonly dbService: IDbService;

    constructor(@inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.dbService = dbService;
    }
    stream = async (path: string, options?: { start: number | undefined, end: number | undefined }) => {
        return createReadStream(path, options);
    }
    copy = async (f: IImportMedia, dirTo: string, fileNameTo: string) => {
        const fromPath = `${f.path}/${f.filename}`;
        const toPath = `${dirTo}/${fileNameTo}`;

        if (!existsSync(fromPath)) {
            throw new Error(`FileService ${fromPath} does not exist`);
        }

        mkdirSync(dirTo, { recursive: true });
        // console.info(`FileService copying ${fromPath} to ${toPath}`)
        copyFileSync(fromPath, toPath, constants.COPYFILE_FICLONE)
        // console.info(`FileService file copied`)
        return true;

    }
    scan = async (path: string) => {
        const files: IImportMedia[] = [];
        const res = readdirSync(path, {
            withFileTypes: true,
        });

        // console.info('scan res', res);
        res.filter(f => f.isFile()).forEach(f => {
            const st = statSync(`${path}/${f.name}`);
            const ext = extname(`${path}/${f.name}`);

            const mimeType = mime.lookup(ext) || '';
            // console.info('st', st)

            files.push({
                filename: f.name,
                size: st.size,
                latestUpdate: st.mtime,
                path,
                ext,
                mimeType
            })

        })

        // console.info('res', files);
        return files;
    }

    get = (path: string, options?: {
        encoding?: BufferEncoding | undefined;
        flag?: string | undefined;
    } | null) => {
        if (!existsSync(path)) {
            throw new Error(`File ${path} does not exist`);
        }
        return readFileSync(path, options)
    }

    delete = (path: string) => {
        if (!existsSync(path)) {
            throw new Error(`File ${path} does not exist`);
        }
        unlinkSync(path)
        return true;
    }

}

