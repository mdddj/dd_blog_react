import React, { useState } from 'react';
import BlogAppBar from '@/components/AppBar';
import { Container, Grid, Skeleton } from '@material-ui/core';
import styles from './index.less';
import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';
import BlogListComponent from '@/components/BlogListComponent';
import { blogApi } from '@/util/request';
import { Category } from 'dd_server_api_web/src/model/result/BlogPushNewResultData';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import { PagerModel } from 'dd_server_api_web/apis/utils/ResultUtil';
import BaseLayout from '@/components/BaseLayout';

/**
 * 分类页面
 * @constructor
 */
const CategoryPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  /// 存放博客列表的数据
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  /// 存放分页的数据
  const [pager, setPager] = useState<PagerModel>();

  /// 存放当前选中的分类数据
  const [currentCategory, setCurrentCategory] = useState<Category>();

  /// 加载博客数据
  const fetchBlogsData = async (page: number, id: number) => {
    setLoaded(false);
    const result = await blogApi().getBlogsByCategoryId(id, {
      page: page,
      pageSize: 10,
    });
    setPager(result.data?.page);
    let data = result.data?.list ?? [];
    setBlogs(data);
    setLoaded(true);
  };

  return (
    <BaseLayout
      appbarCurrent={'category'}
      rightContainer={
        <>
          <ArchiveShow
            title={'分类'}
            type={ArchiveShowType.Category}
            onLoad={async (datas) => {
              if (datas && datas.categoryList.length != 0) {
                setCurrentCategory(datas.categoryList[0]);
                await fetchBlogsData(1, datas.categoryList[0].id);
              }
            }}
            onCategorySelect={async (category) => {
              setCurrentCategory(category);
              await fetchBlogsData(1, category.id);
            }}
          />
        </>
      }
    >
      {/*标题*/}
      {currentCategory && <h1>{currentCategory?.name}</h1>}

      {!loaded && (
        <>
          <Skeleton />
          <Skeleton animation={'pulse'} />
        </>
      )}
      {loaded && (
        <BlogListComponent
          blogs={blogs}
          onPageChange={async (page) => {
            await fetchBlogsData(page, currentCategory!.id);
          }}
          pager={pager}
        />
      )}
    </BaseLayout>
  );
};

export default CategoryPage;
