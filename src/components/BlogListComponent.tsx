import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import React, { useState } from 'react';
import { useMount } from '@umijs/hooks';
import BlogCardLayout from '@/components/BlogCardLayout';
import { Page, PagerModel } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Pagination } from '@material-ui/core';

type BlogListParams = {
  request: (page: number) => Promise<Page<BlogData>>;
};

/// 博客列表的组件
const BlogListComponent: React.FC<BlogListParams> = ({ request }) => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [pageModel, setPageModel] = useState<PagerModel>();

  useMount(async () => {
    await fetchData(currPage);
  });

  // 加载博客数据
  const fetchData = async (page: number) => {
    const data = await request(page);
    console.log(data.list); // 有数据
    let blogsList = data.list;
    blogs.concat(blogsList);
    console.log(blogs); // 没数据
    setPageModel(data.page);
    setBlogs(blogs);
  };

  return (
    <div>
      {blogs.map((item) => (
        <BlogCardLayout key={item.id} blog={item} />
      ))}
      {pageModel && (
        <Pagination
          count={pageModel.maxPage}
          page={pageModel.currentPage}
          onChange={async (event, page) => {
            await fetchData(page);
          }}
        />
      )}
    </div>
  );
};

export default BlogListComponent;
