/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'playwright-core',
      '@sparticuz/chromium',
      'electron',
    ],
    // outputFileTracingIncludes: {
    //   '/api/test': '@sparticuz/chromium'
    // }
  },
  webpack: (config, { dev, isServer, webpack, nextRuntime }) => {
    // console.log('webpack', config.module.rules);
    config.module.rules.push({
      test: /\.(ttf|html)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "application/octet-stream",
        name: "fonts/[name].[ext]"
      }
    },
    );
    return config;
  },
};

export default nextConfig;
