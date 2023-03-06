type Session = import('next-auth').Session
type Logger = import('winston').Logger

type ILogger = {
    debug: (message: string, meta: Object, session: Session | null = null) => void,
    info: (message: string, meta: Object, session: Session | null = null) => void,
    warn: (message: string, meta: Object, session: Session | null = null) => void,
    error: (message: string, meta: Object, session: Session | null = null) => void,

}