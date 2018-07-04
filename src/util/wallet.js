const ethUtil = require('ethereumjs-util');
const bip39 = require('bip39');
const HDKey = require('hdkey');
ethUtil.crypto = require('crypto');
ethUtil.Tx = require('ethereumjs-tx');
ethUtil.scrypt = require('scryptsy');
ethUtil.uuid = require('uuid');
ethUtil.WAValidator = require('wallet-address-validator');

window.ethUtil = ethUtil;
window.globalFuncs = require('./globalFuncs');
window.Wallet = require('./mygeterwallet');
window.ethFuncs = require('./getFuncs');
window.uiFuncs = require('./uiFuncs');
window.etherUnits = require('./geterUnits');
window.BigNumber = require('bignumber.js');

window.hd = { bip39, HDKey };
