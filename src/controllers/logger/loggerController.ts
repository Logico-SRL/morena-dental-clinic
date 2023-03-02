import Database from "better-sqlite3";
import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { getLogDir } from "../../services/logger/utils";
import { BaseController } from "../baseController";

@injectable()
export class LoggerController extends BaseController {

    private get logObj() { return (this.req.body as ILogObj) }
    private get logPars() { return (this.req.query as { level: logLevels }) }
    private readonly loggerService: ILogger

    constructor(@inject(IOCServiceTypes.LoggerService) serv: ILogger) {
        super();
        this.loggerService = serv;
    }

    POST = async () => {
        const { level, meta, message } = this.logObj;
        // console.info('post meta', meta)
        await this.loggerService[level](message, meta);
        return this.res.status(200).send('done')
    }

    GET = async () => {

        const dirname = getLogDir();
        const dbName = `${dirname}/morena-dental-sqlite.db`
        const database = new Database(dbName);
        const { level } = this.logPars;
        let where = '';
        switch (level) {
            case `debug`:
                where = where + `level = 'debug' OR `
            case `info`:
                where = where + `level = 'info' OR `
            case `warn`:
                where = where + `level = 'warn' OR `
            case `error`:
                where = where + `level = 'error'`

        }

        const logs = database.prepare(`SELECT * FROM logs WHERE ${where} LIMIT 500`).all();
        console.info('logs get', logs)
        return this.res.status(200).json(logs)
    }

}

