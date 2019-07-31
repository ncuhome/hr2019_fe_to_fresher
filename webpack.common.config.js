const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
};

const devPaths = {
  components: path.resolve(paths.src,"components"),
  pages: path.resolve(paths.src,"pages"),
  assets: path.resolve(paths.src,"assets")
};

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: paths.dist,
    publicPath: '/'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: { presets: ["react", "es2015"] }
        }],
      },
      { 
        test: /\.css$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath: '../'
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)/,
        use: [{
          loader: "file-loader",
          options: {
            name: 'static/[name].[hash:5].[ext]',
            limit: 8192,
          }
        }],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use:[{
          loader:'file-loader',
          options:{
            name:'static/[name].[hash:5].[ext]'
          }
        }],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new htmlWebpackPlugin({ template: './src/index.html' })
  ]
};
