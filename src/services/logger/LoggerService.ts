import { injectable } from "inversify";
import 'reflect-metadata';
import winston, { format, Logger } from 'winston';
import { processEnv } from "../../processEnv";
import { Sqlite3Transport } from "./transports/sqliteTransport";
import { getLogDir } from "./utils";

@injectable()
export class LoggerService implements ILogger {

    private readonly logger: Logger;

    constructor() {

        const dirname = getLogDir();

        this.logger = winston.createLogger({
            // defaultMeta: { userId: 'anonymous' },
            level: processEnv().logs.level,
            format: format.combine(
                format.timestamp(),
                format((info) => {
                    const {
                        timestamp, level, message, userId, ...rest
                    } = info;
                    return {
                        timestamp, level, message, userId: userId || 'anonymous', ...rest,
                    };
                })(),
                format.json({ deterministic: false }),
            ),
            // defaultMeta: { service: 'user-service' },
            transports: [
                //
                // - Write all logs with importance level of `error` or less to `error.log`
                // - Write all logs with importance level of `info` or less to `combined.log`
                //
                new winston.transports.File({ filename: 'error.log', level: 'error', dirname }),
                new winston.transports.File({ filename: 'combined.log', dirname }),
                new Sqlite3Transport({
                    db: `${dirname}/morena-dental-sqlite.db`,
                    tableName: 'logs',
                    params: ['level', 'message', 'meta', 'userId']
                })
            ],
        });
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    private addUserChildLogger = (session: Session | null) => {
        if (session) {
            const { user } = session;
            if (user) {
                console.info('addUserChildLogger adding', user.id)
                return this.logger.child({
                    userId: user.id
                })
            }
        }
        return this.logger;
    }
    public debug = (message: string, meta: Object, session: Session | null = null) => {
        const logger = this.addUserChildLogger(session);
        logger.debug(message, meta);
    }

    public info = (message: string, meta: Object, session: Session | null = null) => {
        const logger = this.addUserChildLogger(session);
        logger.info(message, meta);
    }

    public warn = (message: string, meta: Object, session: Session | null = null) => {
        const logger = this.addUserChildLogger(session);
        logger.warn(message, meta);
    }

    public error = (message: string, meta: Object, session: Session | null = null) => {
        const logger = this.addUserChildLogger(session);
        logger.error(message, meta);
    }

}