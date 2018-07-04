/**
 * File: /Users/fengchengpu/Project/XBProject/XBCenter/src/util/request.js
 * Project: /Users/fengchengpu/Project/XBProject/XBCenter
 * Created Date: Wednesday November 8th 2017 12:03:17 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday November 8th 2017 12:03:17 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 ZhiBei
 */

import fetch from 'isomorphic-fetch';
import { message } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    window.location = '/login';
  }
  // notification.error({
  //   message: `请求错误 ${response.status}: ${response.url}`,
  //   description: response.statusText,
  // });
  message.error(`请求错误 ${response.status}: ${response.url}`, 2);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

function send(url, options) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      authorization: localStorage.token,
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch((error) => {
      if (error.code) {
        // notification.error({
        //   message: error.name,
        //   description: error.message,
        // });
        message.error(error.name + error.message, 2);
      }
      if ('stack' in error && 'message' in error) {
        // notification.error({
        //   message: `请求错误: ${url}`,
        //   description: error.message,
        // });
        message.error(`请求错误: ${url}${error.message}`, 2);
      }
      return error;
    });
}
const request = {
  GET(url, options) {
    return send(url, { ...options, method: 'GET' });
  },
  POST(url, options) {
    return send(url, { ...options, method: 'POST' });
  },
  PUT(url, options) {
    return send(url, { ...options, method: 'PUT' });
  },
  DELETE(url, options) {
    return send(url, { ...options, method: 'DELETE' });
  },
};
module.exports = request;
