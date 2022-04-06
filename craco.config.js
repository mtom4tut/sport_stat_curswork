const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const sassResourcesLoader = require('craco-sass-resources-loader');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '~assets': resolvePath('./src/assets'),
      '~pages': resolvePath('./src/pages'),
      '~widgets': resolvePath('./src/widgets'),
      '~shared': resolvePath('./src/shared'),
      '~entities': resolvePath('./src/entities'),
      '~features': resolvePath('./src/features'),
      '~processes': resolvePath('./src/processes'),
    },
    plugins: [new NodePolyfillPlugin()],
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/assets/styles/base/global-import.scss',
      },
    },
  ],
};
