// const withLess = require('next-with-less');

const nextConfig = {
    reactStrictMode: false,
    experimental: { appDir: false },
    webpack(config) {
        config.resolve.fallback = {
            fs: false,
            async_hooks: false
        };
        return config;
    },
};

// module.exports = createJestConfig(nextConfig);
// module.exports = withLess(nextConfig);
module.exports = nextConfig;