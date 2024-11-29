/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
};

module.exports = nextConfig;
