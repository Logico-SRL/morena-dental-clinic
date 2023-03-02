import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


export const useWebLogger = () => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const log = (obj: ILogObj) => {
        httpService.post(`/api/logger`, obj)
    }
    const logger: ILogger = {
        debug: (message: string, meta: ILogObj['meta']) => {
            log({
                level: 'debug',
                message,
                meta
            })
        },
        info: (message: string, meta: ILogObj['meta']) => {
            log({
                level: 'info',
                message,
                meta
            })
        },
        warn: (message: string, meta: ILogObj['meta']) => {
            log({
                level: 'warn',
                message,
                meta
            })
        },
        error: (message: string, meta: ILogObj['meta']) => {
            log({
                level: 'error',
                message,
                meta
            })
        },
    }

    return logger;
}