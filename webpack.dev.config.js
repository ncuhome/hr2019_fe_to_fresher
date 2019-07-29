const path = require('path')
const webpack = require('webpack');
const config = require('./webpack.common.config');
config.mode = 'development';
config.devServer = {
  hot: true,
  // contentBase: path.join(__dirname, "./dist"),
  open: true,
  // publicPath: '/dist/',
  port: 3000,
  host: "0.0.0.0",
  historyApiFallback: true
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;
