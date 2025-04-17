/* eslint no-param-reassign: off */
/* eslint require-await: off */
/* eslint import/no-commonjs: off */

module.exports = {
  env: { WEB_UI_API_URL: process.env.WEB_UI_API_URL },
  webpackDevMiddleware: (config) => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: false,
      },
    ];
  },
  // // Configuration for development server
  // serverRuntimeConfig: {
  //   // Will only be available on the server side
  // },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  // },
  // // Enhanced development configuration
  // devIndicators: {
  //   buildActivity: true,
  // },
  // // Add server configuration to listen on all interfaces with HMR
  // webpack5: true,
  // webpack: (config) => {
  //   // Add HMR related configurations
  //   config.optimization.minimize = false;
  //   return config;
  // },
  // webpackHotMiddleware: {
  //   // Enable client-side hot module reloading
  //   overlay: true,
  // },
  // // Server settings for docker environment
  // server: {
  //   host: 'localhost',
  //   port: 3000
  // }
};
