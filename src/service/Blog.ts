import { request } from '@@/plugin-request/request';
import { serverHost } from '@/config/server';
import { Result } from '@/model/Result';
import { BlogListData } from '@/model/BlogModel';

/**
 * 获取博客列表
 * @param page  第几页
 * @param pageSize 每页几条数据
 */
export async function getBlogList(
  page: number,
  pageSize: number,
): Promise<Result<BlogListData>> {
  return request<Result<BlogListData>>(
    serverHost + '/api/blog/list?page=' + page + '&pageSize=' + pageSize,
  );
}
