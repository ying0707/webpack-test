const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const projectRoot = path.resolve(__dirname, '../');

module.exports = () => {
  return Merge(CommonConfig, {
    // 1. source-map(最好的sourcemap速度慢)
    // 2.cheap-module-source-map(sourcemap不好只有列映射速度快)
    // 3. eval-source-map(干净sourcemap不影响速度)
    // 4. cheap-module-eval-source-map(最快速生成sourcemap没有列映射，不利于调试，用在大型项目中节约时间成本)
    devtool: 'cheap-module-eval-source-map',
    entry: {
      app: [
        'webpack-hot-middleware/client?reload=true',
        './src/index',
      ],
    },
    output: {
      path: '/',
      filename: 'js/[name].js',
      publicPath: '/',
      chunkFilename: '[name].js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      // webpack dllplugin
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(config.dev.dll.manifest),
      }),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        title: 'themis',
        template: './templates/template-index.html',
        chunks: [
          'manifest', 'vendor', 'app',
        ],
        chunksSortMode(chunk1, chunk2) {
          const order = ['manifest', 'vendor', 'app'];
          const order1 = order.indexOf(chunk1.names[0]);
          const order2 = order.indexOf(chunk2.names[0]);
          return order1 - order2;
        },
        inject: true,
        filename: 'index.html',
      }),
      new AddAssetHtmlPlugin([
        {
          filepath: path.resolve(__dirname, config.dev.dll.fileName),
          outputPath: path.join(config.dev.dll.outputPath),
          publicPath: path.join(config.dev.dll.publicPath),
          includeSourcemap: true,
        },
      ]),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }, {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        }, {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
      ],
    },
  });
};
