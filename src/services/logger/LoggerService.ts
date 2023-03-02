import { injectable } from "inversify";
import path from "path";
import 'reflect-metadata';
import winston, { format, Logger } from 'winston';
import { processEnv } from "../../processEnv";

@injectable()
export class LoggerService implements ILogger {

    private readonly logger: Logger;

    constructor() {
        const dirname = path.isAbsolute(processEnv().logs.dirname) ?
            processEnv().logs.dirname :
            path.resolve(processEnv().logs.dirname);

        this.logger = winston.createLogger({
            level: processEnv().logs.level,
            format: format.combine(
                format.timestamp(),
                format((info) => {
                    const {
                        timestamp, level, message, ...rest
                    } = info;
                    return {
                        timestamp, level, message, ...rest,
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
            ],
        });
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }
    public debug = (message: string, meta: Object) => this.logger.debug(message, meta);

    public info = (message: string, meta: Object) => this.logger.info(message, meta);

    public warn = (message: string, meta: Object) => this.logger.warn(message, meta);

    public error = (message: string, meta: Object) => this.logger.error(message, meta);

}