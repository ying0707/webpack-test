const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const config = require('../config');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const projectRoot = path.resolve(__dirname, '../');

module.exports = () => {
  return Merge(CommonConfig, {
    entry: {
      app: ['./src/index'],
    },
    output: {
      path: path.join(projectRoot, 'dist/'),
      filename: 'js/[name].[chunkHash:6].js',
      publicPath: '/',
      chunkFilename: '[name].[chunkHash:8].js',
    },
    plugins: [
      new ExtractTextPlugin('css/styles[contenthash:6].css'),
      // webpack dllplugin
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(config.build.dll.manifest),
      }),
      new HtmlWebpackPlugin({
        title: 'Themis',
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
          filepath: path.resolve(__dirname, config.build.dll.fileName),
          outputPath: path.join(config.build.dll.outputPath),
          publicPath: path.join(config.build.dll.publicPath),
          includeSourcemap: false,
        },
      ]),
      new CleanWebpackPlugin(['dist'], {
        root: projectRoot,
        verbose: true,
        dry: false,
        // exclude: ["dist/1.chunk.js"]
      }),
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.DefinePlugin({
        'process.env': config.build.env,
      }),
      new webpack.BannerPlugin('版权所有，翻版必究'),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          drop_console: true,
        },
        comments: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          // uses: [     'style-loader', 'css-loader' ],
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        }, {
          test: /\.scss$/,
          // loaders: [     'style', 'css', 'sass' ],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader', // translates CSS into CommonJS
              }, {
                loader: 'sass-loader', // compiles scss to CSS
              },
            ],
          }),
        }, {
          test: /\.less$/,
          // loaders: [     'style-loader', 'css-loader', 'less-loader' ],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader', // translates CSS into CommonJS
              }, {
                loader: 'less-loader', // compiles Less to CSS
              },
            ],
          }),
        },
      ],
    },
  });
};
