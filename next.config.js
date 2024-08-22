/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    async rewrites() {
        const rewrites = [];
        if (process.env.API_HOST)
            rewrites.push({
                source: '/api/v1/:path*',
                destination: `${process.env.API_HOST}/api/v1/:path*`,
            });
        return rewrites;
    },
// async headers() {
//   /** this string is required according to Ensi license */
//   return [{ source: '/(.*)', headers: [{ key: 'X-Ensi-Platform', value: '1' }] }];
// },
}

module.exports = nextConfig
