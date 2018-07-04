const path = require('path');
const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.scss',
      '.css',
      '.jsx',
      '.less',
    ],
    // 别名设置 方便后续引用的地方减少路径复杂度
    alias: {
      // path.join 目录拼接
      pages: path.join(__dirname, '../src/pages/'),
      assets: path.join(__dirname, '../assets/'),
      // '@' : resolve('src'),
      // 'react': path.join(__dirname, 'node_modules')
    },
    // modules: [path.join(__dirname, '../node_modules')]
  },
  plugins: [
    // ProvidePlugin，是webpack的内置模块.使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入
    // 以jquery为例，用ProvidePlugin进行实例初始化后，jquery就会被自动加载并导入对应的node模块中,在代码中可以直接使用 $ jQuery等.
    new ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),
    // split vendor js into its own file. CommonsChunkPlugin是提取公共代码块用的，vendor是一般规则的命名，写成其他的都可以。
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
        );
      },
    }),
    //   // extract webpack runtime and module manifest to its own file in order to
    //   // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // name是提取公共代码块后js文件的名字。
      chunks: ['vendor'], // 只有在vendor中配置的文件才会提取公共代码块至manifest的js文件中
    }),
  ],
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules|bower_components)/,
      use: ['react-hot-loader', 'babel-loader'],
      include: [path.join(projectRoot, 'src'), path.join(projectRoot, 'config')],
    }, {
      test: /\.js[x]?$/,
      use: ['react-hot-loader', 'babel-loader'],
      include: path.join(projectRoot, 'dev-tools'),
    },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      use: 'url-loader?limit=1000&name=[path][name].[ext]',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'file-loader?name=[path][name].[ext]',
    }],
  },
};
