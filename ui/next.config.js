/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    exportPathMap: () => ({
        '/': { page: '/' },
    }),
    images: {
        loader: 'akamai',
        path: '/',
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    assetPrefix: '.',
};

module.exports = nextConfig;
