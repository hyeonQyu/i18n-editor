/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'loadsh/{{member}}',
      },
    },
  },
};

module.exports = nextConfig;
