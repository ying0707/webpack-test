import request from '../util/request';
import { urlAppendQuery } from '../util/tools';
/**
 *
 * @param {*获取用户列表} params
 */
export async function queryWorker(params) {
  return request.GET(urlAppendQuery(`${host}/user/queryUserList`, params));
}
/**
 *
 * @param {*删除用户} params
 */
export async function deleteWorker(params) {
  return request.DELETE(urlAppendQuery(`${host}/user/delete`, params));
}
/**
 *
 * @param {*添加用户} params
 */
export async function addWorker(params) {
  return request.POST(`${host}/user/delete`, { body: { ...params } });
}

/**
 * 角色列表
 * @param {object} params
 */
export async function roleListRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/roleMgr/roleList`, params));
}
export async function getCodeMapByTypeCodeRequest(code) {
  return request.GET(urlAppendQuery(`${host}/data-service/comDataParameter/querySimpleByCode`, { code }));
}
