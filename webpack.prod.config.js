const path = require('path')
const config = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

config.mode = 'production';
config.devtool = "source-map";
config.module.rules[2] = { 
  test: /\.css$/, 
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../",
      },
    },
    'css-loader',
  ],
};
config.plugins.push(new MiniCssExtractPlugin({
  filename: '[name].css'
}));

if (process.env.npm_config_report) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

config.plugins.push(new CleanWebpackPlugin());

module.exports = config;
