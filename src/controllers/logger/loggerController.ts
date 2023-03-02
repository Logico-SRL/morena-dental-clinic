import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class LoggerController extends BaseController {

    private get logObj() { return (this.req.body as ILogObj) }
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

}

