export const processEnv = () => {
    return {
        nextAuthUrl: process.env.NEXTAUTH_URL || '',
        nextAuthSecret: process.env.NEXTAUTH_SECRET,
        currentEnvName: process.env.NEXT_PUBLIC_CURRENT_ENV_NAME,
        logLevel: process.env.LOG_LEVEL,

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