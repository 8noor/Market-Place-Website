// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;


// /// next.config.js
// module.exports = {
//   //...
//   images: {
//     domains: ['cdn.sanity.io'],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     loader: 'default',
//     path: '/_next/image',
//     disableStaticImages: false,
//     minimumCacheTTL: 60,
//     formats: ['image/webp'],
//   },
// };

