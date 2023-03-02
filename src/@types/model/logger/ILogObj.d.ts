type logLevels = 'debug' | 'info' | 'warn' | 'error'

type ILogObj = {
    level: logLevels,
    message: string,
    meta: Object
}