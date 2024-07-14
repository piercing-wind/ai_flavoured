/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
   remotePatterns: [
      {
        protocol: "https",
        hostname: "di6ccwru5n10a.cloudfront.net", //CDN
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
         protocol: "https",
         hostname: "aiflavoured.com",
      },
      {
         protocol: "https",
         hostname: "avatars.githubusercontent.com",
      }
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
    ];
    return config;
  },
  typescript: {
   ignoreBuildErrors: true,
 },
 eslint: {
   ignoreDuringBuilds: true,
 },
 server :{
   port: 3000,
 }

  // experimental: {
  //       serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  //   },
};

export default nextConfig;
