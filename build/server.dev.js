const config = require('../config');
const conf = require('./webpack.config');

if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env;
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');

const webpackConfig = process.env.NODE_ENV === 'testing'
  ? conf('prod')
  : conf('dev');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware

const proxyList = config.dev.proxyTable;

const routes = require('../routes/index');

const app = express();
const compiler = webpack(webpackConfig);

app.use('/mock', routes);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    timings: true,
    colors: true,
    chunks: true,
  },
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// proxy api requests
Object.keys(proxyList).forEach((context) => {
  let options = proxyList[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
// const staticPath = path.posix.join(config.dev.assetsPublicPath, 'common');
// app.use(staticPath, express.static(path.resolve(__dirname, config.dev.staticPath)));
// app.use(path.join(__dirname, '../assets'), express.static(path.resolve(__dirname, config.dev.staticPath)));

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  const uri = `http://127.0.0.1:${port}`;
  console.log(`Listening at ${uri}\n`);
});
