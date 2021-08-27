import {request} from "@@/plugin-request/request";
import {serverHost} from "@/config/server";

/**
 * 获取博客列表
 * @param page  第几页
 * @param pageSize 每页几条数据
 */
export async function getBlogList(page: number,pageSize: number) {
  return request(serverHost+'/api/blog/list?page='+page+'&pageSize='+pageSize);
}
