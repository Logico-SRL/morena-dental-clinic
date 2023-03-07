import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


export const useWebLogger = () => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const log = (obj: ILogObj) => {
        httpService.post(`/api/logger`, obj)
    }
    const logger: ILogger = {
        debug: (message: string, meta?: ILogObj['meta']) => {
            log({
                level: 'debug',
                message,
                meta: meta || {}
            })
        },
        info: (message: string, meta?: ILogObj['meta']) => {
            log({
                level: 'info',
                message,
                meta: meta || {}
            })
        },
        warn: (message: string, meta?: ILogObj['meta']) => {
            log({
                level: 'warn',
                message,
                meta: meta || {}
            })
        },
        error: (message: string, meta?: ILogObj['meta']) => {
            log({
                level: 'error',
                message,
                meta: meta || {}
            })
        },
    }

    return logger;
}