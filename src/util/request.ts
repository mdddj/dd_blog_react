import DdServerApiByWeb from 'dd_server_api_web/apis';
import TaokeApi from 'dd_server_api_web/apis/taoke';

const MOOSE_REACT_LEARN_ACCESS_TOKEN = 'auth_token';

// const host = 'https://itbug.shop';
const host = 'http://localhost';
/**
 * 淘客api接口
 */
export const taokeApi = (): TaokeApi => {
  const api = TaokeApi.getInstance();
  api.host = host;
  return api;
};

/**
 * 博客api接口
 */
export const blogApi = (): DdServerApiByWeb => {
  const api = DdServerApiByWeb.getInstance();
  api.host = host;
  api.token = getAccessToken();
  return api;
};

// 保存
export const saveAccessToken = (token: string) => {
  localStorage.setItem(MOOSE_REACT_LEARN_ACCESS_TOKEN, token);
};

// 获取
export const getAccessToken = (): string => {
  return localStorage.getItem(MOOSE_REACT_LEARN_ACCESS_TOKEN) ?? '';
};

// 移除
export const removeAccessToken = () => {
  localStorage.removeItem(MOOSE_REACT_LEARN_ACCESS_TOKEN);
};
