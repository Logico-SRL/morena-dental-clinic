type Logger = import('winston').Logger

type ILogger = {
    debug: (message: string, meta: Object) => void,
    info: (message: string, meta: Object) => void,
    warn: (message: string, meta: Object) => void,
    error: (message: string, meta: Object) => void,

}