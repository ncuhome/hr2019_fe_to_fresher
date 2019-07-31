const path = require('path')
const config = require('./webpack.common.config');
config.mode = 'production';
config.devtool = "source-map";
module.exports = config;
