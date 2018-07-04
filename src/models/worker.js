import { deleteWorker, roleListRequest, getCodeMapByTypeCodeRequest } from '../api/api';

export async function queryList(params, put) {
  const response = await roleListRequest(params);
  put({
    type: 'worker/query',
    // data: [{ id: 1 }, { id: 2 }],
    data: response,
  });
  return {};
}
export async function getCodeMapByTypeCode(param, put) {
  const response = await getCodeMapByTypeCodeRequest(100006);
  put({
    type: 'worker/typecode',
    data: response,
  });
  return response;
}

export async function del(params, put) {
  const response = await deleteWorker(params);
  put({
    type: 'worker/del',
    data: response.data,
  });
  return response;
}
/**
 * 如果cache: true 自动装载数据并且整个工程每条数据只会装载一次，（如果一次没有装载成功那么接下来的取值还会继续装载直到装载成功）
 * 如果cache: false 但bindActionCreators有值，那么装载机制将以绑定模型的组件为单位装载而不是整个工程
 */
export default {
  namespace: 'worker', // 必须唯一
  state: {
    list: [],
    total: 0,
    loading: true,
    code: [],
  },
  cache: true,
  autowrite: {
    list: queryList,
    code: getCodeMapByTypeCode,
  },
  reducers: {
    query(state, action) {
      return {
        ...state,
        list: action.data.obj ? (action.data.obj.rows || []) : [],
        total: 2,
      };
    },
    typecode(state, action) {
      return {
        ...state,
        code: action.data.obj ? (action.data.obj.rows || []) : [],
      };
    },
    del(state, action) {
      return {
        ...state,
        loading: action,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
