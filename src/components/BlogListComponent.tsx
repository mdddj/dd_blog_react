import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import React, { useState } from 'react';
import { useMount } from '@umijs/hooks';
import BlogCardLayout from '@/components/BlogCardLayout';

type BlogListParams = {
  request: (page: number) => Promise<BlogData[]>;
};

/// 博客列表的组件
const BlogListComponent: React.FC<BlogListParams> = ({ request }) => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useMount(async () => {
    await fetchData(currPage);
  });

  // 加载博客数据
  const fetchData = async (page: number) => {
    const blogs = await request(page);
    blogs.concat(blogs);
    setBlogs(blogs);
  };

  return (
    <div>
      {blogs.map((item) => (
        <BlogCardLayout key={item.id} blog={item} />
      ))}
    </div>
  );
};

export default BlogListComponent;
