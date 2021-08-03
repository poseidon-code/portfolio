module.exports = {
    webpack5: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://pritamh.netlify.app/api/:path*',
            },
        ];
    },
};
