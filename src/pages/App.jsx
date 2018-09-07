import React, { Component } from 'react';
import { RootRouteConnect } from '../tomatobean/connect';
import { Selecter } from '../tomatobean';
import IndexHeader from '../components/indexHeader/IndexHeader';
// import Footer from '../components/footer';
import '../styles/index.less';

@Selecter(['worker'])
@RootRouteConnect
class App extends Component {
  renderHeader = () => {
    const to = this.props.location.pathname;
    if (window.location.hostname === 'wallet.themis.network' || window.location.hostname === 'www.wallet.themis.network') { return <WalletHeader to={to} />; }
    if (window.location.hostname === 'www.themiscan.io' || window.location.hostname === 'themiscan.io') { return <ExplorerHeader to={to} />; }
    return <IndexHeader to={to} />;
  }
  render() {
    return (
      <div className="app-container">
        {
          this.renderHeader()
        }
        {/* <Footer /> */}
      </div>
    );
  }
}
module.exports = App;
