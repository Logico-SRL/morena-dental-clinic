const fs = require('fs');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
    openAnalyzer: true,
})

const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')

const isDev = (phase) => phase === PHASE_DEVELOPMENT_SERVER

const getEnv = (phase) => {

    return new Promise((res, rej) => {


        // const isAseo = process.env.IS_ASEO == 1;
        // const isProd = phase === PHASE_PRODUCTION_BUILD

        // console.info('isAseo', isAseo);

        try {

            const fixedEnv = {}
            const envName = isDev(phase) ? 'development' : 'production';
            const appConfPath = `env/app.${envName}.json`;
            const dbConfPath = `env/db.${envName}.json`;
            const appFile = JSON.parse(fs.readFileSync(path.resolve(appConfPath), { encoding: 'utf-8' }))
            const dbFile = JSON.parse(fs.readFileSync(path.resolve(dbConfPath), { encoding: 'utf-8' }))

            const env = {
                ...fixedEnv,
                ...appFile,
                ...dbFile
            }

            // console.info('found env', env);
            res(env)

        } catch (err) {
            console.error(err);
            rej(err);
        }

    });
}

const nextConfig = async function (phase) {

    const env = await getEnv(phase);

    let config = {
        reactStrictMode: false,
        experimental: { appDir: false },
        output: 'standalone',
        webpack(config) {
            config.resolve.fallback = {
                fs: false,
                async_hooks: false
            };
            return config;
        },
        env
    }


    console.info('config.output', config.output);
    return config; //isDev(phase) ? config : withBundleAnalyzer(config);

};

// module.exports = createJestConfig(nextConfig);
// module.exports = withLess(nextConfig);
module.exports = nextConfig;