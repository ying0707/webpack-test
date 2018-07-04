
/* eslint-disable */
const uiFuncs = function () {};
uiFuncs.getTxData = function (obj) {
  return {
    to: obj.tx.to,
    value: obj.tx.value,
    unit: obj.tx.unit,
    gasLimit: obj.tx.gasLimit,
    data: obj.tx.data,
    from: obj.wallet.getAddressString(),
    privKey: obj.wallet.privKey ? obj.wallet.getPrivateKeyString() : '',
    path: obj.wallet.getPath(),
    hwType: obj.wallet.getHWType(),
    hwTransport: obj.wallet.getHWTransport(),
  };
};
uiFuncs.isTxDataValid = function (txData) {
  if (txData.to != '0xCONTRACT' && !ethFuncs.validateEtherAddress(txData.to)) throw globalFuncs.errorMsgs[5];
  else if (!globalFuncs.isNumeric(txData.value) || parseFloat(txData.value) < 0) throw globalFuncs.errorMsgs[0];
  else if (!globalFuncs.isNumeric(txData.gasLimit) || parseFloat(txData.gasLimit) <= 0) throw globalFuncs.errorMsgs[8];
  else if (!ethFuncs.validateHexString(txData.data)) throw globalFuncs.errorMsgs[9];
  if (txData.to == '0xCONTRACT') txData.to = '';
};
uiFuncs.signTxTrezor = function (rawTx, txData, callback) {
  const localCallback = function (result) {
    if (!result.success) {
      if (callback !== undefined) {
        callback({
          isError: true,
          error: result.error,
        });
      }
      return;
    }

    rawTx.v = `0x${ethFuncs.decimalToHex(result.v)}`;
    rawTx.r = `0x${result.r}`;
    rawTx.s = `0x${result.s}`;
    const eTx = new ethUtil.Tx(rawTx);
    rawTx.rawTx = JSON.stringify(rawTx);
    rawTx.signedTx = `0x${eTx.serialize().toString('hex')}`;
    rawTx.isError = false;
    if (callback !== undefined) callback(rawTx);
  };

  TrezorConnect.signEthereumTx(
    txData.path,
    ethFuncs.getNakedAddress(rawTx.nonce),
    ethFuncs.getNakedAddress(rawTx.gasPrice),
    ethFuncs.getNakedAddress(rawTx.gasLimit),
    ethFuncs.getNakedAddress(rawTx.to),
    ethFuncs.getNakedAddress(rawTx.value),
    ethFuncs.getNakedAddress(rawTx.data),
    rawTx.chainId,
    localCallback
  );
};
uiFuncs.signTxLedger = function (app, eTx, rawTx, txData, old, callback) {
  eTx.raw[6] = Buffer.from([rawTx.chainId]);
  eTx.raw[7] = eTx.raw[8] = 0;
  const toHash = old ? eTx.raw.slice(0, 6) : eTx.raw;
  const txToSign = ethUtil.rlp.encode(toHash);
  const localCallback = function (result, error) {
    if (typeof error !== 'undefined') {
      error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
      if (callback !== undefined) {
        callback({
          isError: true,
          error,
        });
      }
      return;
    }
    rawTx.v = `0x${result.v}`;
    rawTx.r = `0x${result.r}`;
    rawTx.s = `0x${result.s}`;
    eTx = new ethUtil.Tx(rawTx);
    rawTx.rawTx = JSON.stringify(rawTx);
    rawTx.signedTx = `0x${eTx.serialize().toString('hex')}`;
    rawTx.isError = false;
    if (callback !== undefined) callback(rawTx);
  };
  app.signTransaction(txData.path, txToSign.toString('hex'), localCallback);
};
uiFuncs.signTxDigitalBitbox = function (eTx, rawTx, txData, callback) {
  const localCallback = function (result, error) {
    if (typeof error !== 'undefined') {
      error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
      if (callback !== undefined) {
        callback({
          isError: true,
          error,
        });
      }
      return;
    }
    uiFuncs.notifier.info("The transaction was signed but not sent. Click the blue 'Send Transaction' button to continue.");
    rawTx.v = ethFuncs.sanitizeHex(result.v);
    rawTx.r = ethFuncs.sanitizeHex(result.r);
    rawTx.s = ethFuncs.sanitizeHex(result.s);
    const eTx_ = new ethUtil.Tx(rawTx);
    rawTx.rawTx = JSON.stringify(rawTx);
    rawTx.signedTx = ethFuncs.sanitizeHex(eTx_.serialize().toString('hex'));
    rawTx.isError = false;
    if (callback !== undefined) callback(rawTx);
  };
  uiFuncs.notifier.info('Touch the LED for 3 seconds to sign the transaction. Or tap the LED to cancel.');
  const app = new DigitalBitboxEth(txData.hwTransport, '');
  app.signTransaction(txData.path, eTx, localCallback);
};
uiFuncs.signTxSecalot = function (eTx, rawTx, txData, callback) {
  const localCallback = function (result, error) {
    if (typeof error !== 'undefined') {
      error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
      if (callback !== undefined) {
        callback({
          isError: true,
          error,
        });
      }
      return;
    }
    uiFuncs.notifier.info("The transaction was signed but not sent. Click the blue 'Send Transaction' button to continue.");
    rawTx.v = ethFuncs.sanitizeHex(result.v);
    rawTx.r = ethFuncs.sanitizeHex(result.r);
    rawTx.s = ethFuncs.sanitizeHex(result.s);

    const eTx_ = new ethUtil.Tx(rawTx);
    rawTx.rawTx = JSON.stringify(rawTx);
    rawTx.signedTx = ethFuncs.sanitizeHex(eTx_.serialize().toString('hex'));
    rawTx.isError = false;
    if (callback !== undefined) callback(rawTx);
  };
  uiFuncs.notifier.info('Tap a touch button on your device to confirm signing.');
  const app = new SecalotEth(txData.hwTransport);
  app.signTransaction(txData.path, eTx, localCallback);
};
uiFuncs.trezorUnlockCallback = function (txData, callback) {
  TrezorConnect.open((error) => {
    if (error) {
      if (callback !== undefined) {
        callback({
          isError: true,
          error,
        });
      }
    } else {
      txData.trezorUnlocked = true;
      uiFuncs.generateTx(txData, callback);
    }
  });
};
uiFuncs.generateTx = function (txData, callback) {
  console.log(txData);
  // console.log(22222222);
  if ((typeof txData.hwType !== 'undefined') && (txData.hwType == 'trezor') && !txData.trezorUnlocked) {
    uiFuncs.trezorUnlockCallback(txData, callback);
    return;
  }
  try {
    uiFuncs.isTxDataValid(txData);
    const genTxWithInfo = function (data) {
      const rawTx = {
        nonce: ethFuncs.sanitizeHex(data.nonce),
        gasPrice: !data.isOffline ? ethFuncs.sanitizeHex(data.gasprice) : ethFuncs.sanitizeHex(ethFuncs.addTinyMoreToGas(data.gasprice)),
        gasLimit: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(txData.gasLimit)),
        to: ethFuncs.sanitizeHex(txData.to),
        value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(etherUnits.toWei(txData.value, txData.unit))),
        data: ethFuncs.sanitizeHex(txData.data),
      };
      rawTx.chainId = 20180630;
      rawTx.data = rawTx.data == '' ? '0x' : rawTx.data;
      console.log(rawTx);
      const eTx = new ethUtil.Tx(rawTx);
      eTx.sign(new Buffer(txData.privKey, 'hex'));
      rawTx.rawTx = JSON.stringify(rawTx);
      rawTx.signedTx = `0x${eTx.serialize().toString('hex')}`;
      rawTx.isError = false;
      if (callback !== undefined) callback(rawTx);
    };
    if (txData.nonce || txData.gasPrice) {
      const data = {
        nonce: txData.nonce || "0x0",
        gasprice: txData.gasPrice,
      };
      data.isOffline = txData.isOffline ? txData.isOffline : false;
      genTxWithInfo(data);
    } else {
      ajaxReq.getTransactionData(txData.from, (data) => {
        if (data.error && callback !== undefined) {
          callback({
            isError: true,
            error: e,
          });
        } else {
          data = data.data;
          data.isOffline = txData.isOffline ? txData.isOffline : false;
          genTxWithInfo(data);
        }
      });
    }
  } catch (e) {
    if (callback !== undefined) {
      callback({
        isError: true,
        error: e,
      });
    }
  }
};
uiFuncs.sendTx = function (signedTx, callback) {
  // check for web3 late signed tx
  if (signedTx.slice(0, 2) !== '0x') {
    const txParams = JSON.parse(signedTx);
    window.web3.eth.sendTransaction(txParams, (err, txHash) => {
      if (err) {
        return callback({
          isError: true,
          error: err.stack,
        });
      }
      callback({
        data: txHash,
      });
    });
    return;
  }

  ajaxReq.sendRawTx(signedTx, (data) => {
    let resp = {};
    if (data.error) {
      resp = {
        isError: true,
        error: data.msg,
      };
    } else {
      resp = {
        isError: false,
        data: data.data,
      };
    }
    if (callback !== undefined) callback(resp);
  });
};
uiFuncs.transferAllBalance = function (fromAdd, gasLimit, callback) {
  try {
    ajaxReq.getTransactionData(fromAdd, (data) => {
      if (data.error) throw data.msg;
      data = data.data;
      const gasPrice = new BigNumber(ethFuncs.sanitizeHex(ethFuncs.addTinyMoreToGas(data.gasprice))).times(gasLimit);
      let maxVal = new BigNumber(data.balance).minus(gasPrice);
      maxVal = etherUnits.toEther(maxVal, 'wei') < 0 ? 0 : etherUnits.toEther(maxVal, 'wei');
      if (callback !== undefined) {
        callback({
          isError: false,
          unit: 'ether',
          value: maxVal,
        });
      }
    });
  } catch (e) {
    if (callback !== undefined) {
      callback({
        isError: true,
        error: e,
      });
    }
  }
};
uiFuncs.notifier = {
  alerts: {},
  warning(msg, duration = 5000) {
    this.addAlert('warning', msg, duration);
  },
  info(msg, duration = 5000) {
    this.addAlert('info', msg, duration);
  },
  danger(msg, duration = 7000) {
    msg = msg.message ? msg.message : msg;
    // Danger messages can be translated based on the type of node
    msg = globalFuncs.getEthNodeMsg(msg);
    this.addAlert('danger', msg, duration);
  },
  success(msg, duration = 5000) {
    this.addAlert('success', msg, duration);
  },
  addAlert(type, msg, duration) {
    if (duration == undefined) duration = 7000;
    // Save all messages by unique id for removal
    const id = Date.now();
    alert = this.buildAlert(id, type, msg);
    this.alerts[id] = alert;
    const that = this;
    if (duration > 0) { // Support permanent messages
      setTimeout(alert.close, duration);
    }
    if (!this.scope.$$phase) this.scope.$apply();
  },
  buildAlert(id, type, msg) {
    const that = this;
    return {
      show: true,
      type,
      message: msg,
      close() {
        delete that.alerts[id];
        if (!that.scope.$$phase) that.scope.$apply();
      },
    };
  },
};
module.exports = uiFuncs;
/* eslint-enable */
