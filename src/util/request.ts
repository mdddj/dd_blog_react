import DdServerApiByWeb from 'dd_server_api_web/apis';
import TaokeApi from 'dd_server_api_web/apis/taoke';

const host = 'https://itbug.shop';
// const host = 'http://localhost';
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
  return api;
};
