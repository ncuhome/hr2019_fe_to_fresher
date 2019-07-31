const path = require('path')
const config = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

config.mode = 'production';
config.devtool = "source-map";
config.module.rules[2] = { 
  test: /\.css$/, 
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
      // only enable hot in development
      hmr: process.env.NODE_ENV === 'development',
      // if hmr does not work, this is a forceful method.
      reloadAll: true,
      },
    },
    'css-loader',
  ],
};
config.plugins.push(new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
}));

module.exports = config;
