import { request } from '@@/plugin-request/request';
import { serverHost } from '@/config/server';
import { Result } from '@/model/Result';
import { Blog, BlogListData } from '@/model/BlogModel';
import { ArchiveModel } from '@/model/ArchiveModel';
import { SimpleValueModel } from '@/model/SimpleValueModel';

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

/**
 * 获取博客详情
 * @param blogId  博客id
 */
export async function getBlogDetailById(blogId: number): Promise<Result<Blog>> {
  return request<Result<Blog>>(`${serverHost}/api/blog/get/${blogId}`);
}

/**
 * 获取博客归档数据
 */
export async function getArchives(): Promise<Result<ArchiveModel>> {
  return request<Result<ArchiveModel>>(`${serverHost}/api/blog/statistics`);
}

/**
 * 根据博客别名获取博客详情
 * @param alias 博客别名
 */
export async function getBlogWithAlias(alias: string): Promise<Result<Blog>> {
  return request<Result<Blog>>(`${serverHost}/api/blog/alias?alias=${alias}`);
}

/**
 *
 * 获取特殊文本
 * @param name 别名
 * @returns
 */
export async function getTextByName(
  name: string,
): Promise<Result<SimpleValueModel>> {
  return request<Result<SimpleValueModel>>(
    `${serverHost}/api/blog/text?name=${name}`,
  );
}
