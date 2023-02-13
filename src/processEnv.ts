export const processEnv = () => {
    // console.info('processEnv start');

    const ret = {
        nextAuthUrl: process.env.NEXTAUTH_URL || '',
        nextAuthSecret: process.env.NEXTAUTH_SECRET,
        currentEnvName: process.env.NEXT_PUBLIC_CURRENT_ENV_NAME,
        logLevel: process.env.LOG_LEVEL,

        db: {
            type: process.env.DB_TYPE,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: +(process.env.DB_PORT || 0),
        },
        unoDb: {
            type: process.env.UNO_DB_TYPE,
            host: process.env.UNO_DB_HOST,
            username: process.env.UNO_DB_USERNAME,
            password: process.env.UNO_DB_PASSWORD,
            database: process.env.UNO_DB_DATABASE,
            port: +(process.env.UNO_DB_PORT || 0),
        },
        previews: {
            quality: +(process.env.DEFAULT_QUALITY || '50'),
            previewSize: +(process.env.PREVIEW_SIZE || '800'),
            thumbnailSize: +(process.env.THUMBNAIL_SIZE || '200')
        }
    }

    return ret;
}