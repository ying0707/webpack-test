import createApp from './tomatobean';
import { routerConfig, walletConfig, explorerConfig } from '../config/routerConfig';
import models from './models';
import host from '../config/remoteHost';
import './util/wallet';

console.log(window.location);
let indexConfig;
if (process.env.NODE_ENV === 'production') {
  if (window.location.hostname === 'wallet.themis.network' || window.location.hostname === 'www.wallet.themis.network') {
    indexConfig = walletConfig;
  } else if (window.location.hostname === 'www.themiscan.io' || window.location.hostname === 'themiscan.io') {
    indexConfig = explorerConfig;
  } else if (window.location.hostname === 'themis.app' || window.location.hostname === 'localhost') {
    indexConfig = routerConfig;
  }
} else { indexConfig = routerConfig; }

const app = createApp();
// app.config(config);
app.router(indexConfig);
app.model(models);
app.setHost(host);

app.run();

