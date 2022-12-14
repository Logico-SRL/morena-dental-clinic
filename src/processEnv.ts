export const processEnv = () => {
    return {
        // logLevel: process.env.LOG_LEVEL || 'info',
        // logApiBody: process.env.LOG_API_BODY || false,
        // logFolder: process.env.LOG_FOLDER || './logs',
        // authPrivKey: process.env.NEXTAUTH_SECRET,
        // currentEnvName: process.env.NEXT_PUBLIC_CURRENT_ENV_NAME,
        // version: process.env.NEXT_PUBLIC_VERSION,
        // lastOpenDay: process.env.LAST_OPEN_DAY ? +process.env.LAST_OPEN_DAY : 15,
        // cronSecret: process.env.CRON_SECRET,
        db: {
            type: process.env.DB_TYPE,
            host: process.env.DB_HOST,
            // connStr: process.env.DB_CONN_STRING,
            //port:+process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: +(process.env.DB_PORT || 0),

        }
    }
}