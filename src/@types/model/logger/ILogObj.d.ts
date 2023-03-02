type logLevels = 'debug' | 'info' | 'warn' | 'error'

type ILogObj = {
    id?: number,
    timestamp?: number,
    level: logLevels,
    message: string,
    meta: Object
}