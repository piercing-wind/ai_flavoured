/** @type {import('next').NextConfig} */
const nextConfig = {
      webpack :(config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
            config.resolve.alias.canvas = false;
            config.resolve.alias.encoding = false;
            config.resolve.alias = {
                  ...config.resolve.alias,
                  "sharp$": false,
                  "onnxruntime-node$": false,
              };
            return config;
      },
      // experimental: {
      //       serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
      //   },
};

export default nextConfig;
