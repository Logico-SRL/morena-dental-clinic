import Database from "better-sqlite3";
import { inject, injectable } from "inversify";
import { getServerSession } from "next-auth/next";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { nextAuthOptions } from "../../pages/api/auth/nextAuthOptions";
import { getLogDir } from "../../services/logger/utils";
import { BaseController } from "../baseController";

@injectable()
export class LoggerController extends BaseController {

    private get logObj() { return (this.req.body as ILogObj) }
    private get logPars() { return (this.req.query as { level: logLevels, userId: string }) }
    private readonly loggerService: ILogger;

    constructor(@inject(IOCServiceTypes.LoggerService) serv: ILogger) {
        super();
        this.loggerService = serv;
    }

    POST = async () => {
        const { level, meta, message } = this.logObj;

        const session = await getServerSession(this.req, this.res, nextAuthOptions)
        // console.info('logger post session', session);

        await this.loggerService[level](message, meta, session);
        return this.res.status(200).send('done')
    }

    GET = async () => {

        const dirname = getLogDir();
        const dbName = `${dirname}/morena-dental-sqlite.db`
        const database = new Database(dbName);
        const { level, userId } = this.logPars;
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
        where = `(${where})`

        if (userId) {
            where = where + ` AND userId = '${userId}'`
        }

        const statement = `SELECT * FROM logs WHERE ${where} ORDER BY timestamp DESC LIMIT 500`
        console.info('logs get', statement);

        const logs = database.prepare(statement).all();
        return this.res.status(200).json(logs)
    }

}

