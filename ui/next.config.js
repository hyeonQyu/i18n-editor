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
    assetPrefix: '.',
};

module.exports = nextConfig;
