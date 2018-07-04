
/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/models/internal.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Tuesday November 14th 2017 5:43:16 pm
 * Author: youngcao
 * -----
 * Last Modified:Tuesday November 14th 2017 7:42:23 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
export async function toggle(params, put) {
  put({
    type: 'internal/query',
    data: params,
  });
  return params;
}

export default {
  namespace: 'internal', // 必须唯一
  state: {
    collapsed: true,
  },
  reducers: {
    query(state, action) {
      return {
        ...state,
        collapsed: action.data.collapsed,
      };
    },
  },
};

