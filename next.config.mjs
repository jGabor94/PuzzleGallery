import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'puzzlegallery.s3.eu-central-1.amazonaws.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    }
};



process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
});


export default withPlaiceholder(nextConfig);
