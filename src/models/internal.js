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

