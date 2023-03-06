type logLevels = 'debug' | 'info' | 'warn' | 'error'

type ILogObj = {
    id?: number,
    timestamp?: number,
    level: logLevels,
    userId: string,
    message: string,
    meta: Object
}