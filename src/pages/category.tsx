import React, { useState } from 'react';
import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';
import BlogListComponent from '@/components/BlogListComponent';
import { blogApi } from '@/util/request';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import {
  Page,
  PagerModel,
  successResultHandle,
} from 'dd_server_api_web/apis/utils/ResultUtil';
import BaseLayout from '@/components/BaseLayout';
import { useLocation } from 'umi';
import { Result } from 'dd_server_api_web/src/utils/ResultUtil';
import { Loading, Spinner } from '@geist-ui/react';

/**
 * 分类页面
 * @constructor
 */
const CategoryPage: React.FC = () => {
  /// 加载分类数据中
  const [initIng, setInitIng] = useState<boolean>(true);

  /// 加载博客列表中
  const [loading, setLoading] = useState<boolean>(false);

  /// 存放博客列表的数据
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  /// 存放分页的数据
  const [pager, setPager] = useState<PagerModel>();

  /// 存放当前选中的分类数据
  const [selectKey, setSelectedKey] = useState<any>();

  const {
    query: { t },
  } = useLocation() as any;

  /// 获取页面的类型
  const getPageType = (): ArchiveShowType => {
    switch (t) {
      case 'c':
        return ArchiveShowType.Category;
      case 'a':
        return ArchiveShowType.Archive;
      case 't':
        return ArchiveShowType.Tag;
      default:
        return ArchiveShowType.Category;
    }
  };

  const getPageTitle = (): string => {
    let pageType = getPageType();
    switch (pageType) {
      case ArchiveShowType.Category:
        return '分类';
      case ArchiveShowType.Archive:
        return '归档';
      case ArchiveShowType.Tag:
        return '标签';
      default:
        return '分类';
    }
  };

  /// 判断页面使用哪个接口加载博客数据
  const loadPageData = (
    page: number,
    key: any,
  ): Promise<Result<Page<BlogData>>> => {
    let pageType = getPageType();
    switch (pageType) {
      case ArchiveShowType.Category:
        return blogApi().getBlogsByCategoryId(key, { page, pageSize: 10 });
      case ArchiveShowType.Archive:
        return blogApi().getBlogsByMonth(key, { page, pageSize: 10 });
      case ArchiveShowType.Tag:
        return blogApi().getBlogsByTagId(key, { page, pageSize: 10 });
      default:
        return blogApi().getBlogsByCategoryId(key, { page, pageSize: 10 });
    }
  };

  /// 处理返回的数据
  const resultHandle = (result: Result<Page<BlogData>>) => {
    successResultHandle<Page<BlogData>>(result, (data) => {
      let blogsResult = data?.list ?? [];
      setBlogs(blogsResult);
      setPager(data?.page);
    });
    setLoading(false);
  };

  return (
    <BaseLayout
      appbarCurrent={'category'}
      rightContainer={
        <>
          <ArchiveShow
            title={
              <span>
                {getPageTitle()} {loading && <Spinner />}
              </span>
            }
            type={getPageType()}
            onCategorySelect={async (category) => {
              setLoading(true);
              setSelectedKey(category.id);
              let result = await loadPageData(1, category.id);
              resultHandle(result);
            }}
            onTagSelect={async (tag) => {
              setLoading(true);
              setSelectedKey(tag.id);
              let result = await loadPageData(1, tag.id);
              resultHandle(result);
            }}
            onArchiveSelect={async (m) => {
              setLoading(true);
              setSelectedKey(m.months);
              let result = await loadPageData(1, m.months);
              resultHandle(result);
            }}
            onLoad={(_) => {
              setInitIng(false);
            }}
          />
        </>
      }
    >
      {initIng && <Loading />}

      {/*博客列表显示区域*/}
      <BlogListComponent
        blogs={blogs}
        onPageChange={async (page) => {
          await loadPageData(page, selectKey);
        }}
        pager={pager}
      />
    </BaseLayout>
  );
};

export default CategoryPage;
