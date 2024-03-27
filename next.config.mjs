import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    env: {
        itemsPerPage: 15,
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

export default withPlaiceholder(nextConfig);
