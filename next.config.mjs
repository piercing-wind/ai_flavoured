/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
   remotePatterns: [
      {
        protocol: "https",
        hostname: "di6ccwru5n10a.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
         protocol: "https",
         hostname: "https://main.dldpgq47ggwnl.amplifyapp.com",
      },
      {
         protocol: "https",
         hostname: "https://aiflavoured.com",
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
  // experimental: {
  //       serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  //   },
};

export default nextConfig;
