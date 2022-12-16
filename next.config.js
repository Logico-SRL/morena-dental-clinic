const withLess = require('next-with-less');

const nextConfig = withLess({
    reactStrictMode: true,
    experimental: { appDir: true },
    webpack(config) {
        config.resolve.fallback = {
            fs: false,
            async_hooks: false
        };
        return config;
    },
});

module.exports = nextConfig;