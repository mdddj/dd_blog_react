import React from 'react';
import { useLocation } from 'umi';
import BlogAppBar from '@/components/AppBar';
import { useMount, useRequest } from '@umijs/hooks';
import { getBlogDetailById } from '@/service/Blog';
import { Result } from '@/model/Result';
import { Blog } from '@/model/BlogModel';
import { Page } from '@geist-ui/react';
import { BlogPreview } from '@/components/MarkdownPreview';

const BlogDetailPage: React.FC = () => {
  const {
    query: { id },
  } = useLocation() as any;

  const fetchBlogData = async (id: number) => {
    return getBlogDetailById(id);
  };

  const { run, data, loading } = useRequest<Result<Blog>>(fetchBlogData, {
    manual: true,
  });

  // 启动
  useMount(async () => {
    if (id) {
      await run(id as number);
    }
  });

  if (loading) {
    return <>加载中</>;
  }

  const blog: Blog | undefined = data?.data;

  return (
    <>
      <BlogAppBar />

      {blog && (
        <Page>
          <Page.Header>
            <h2>{blog.title}</h2>
          </Page.Header>
          <Page.Content>
            <BlogPreview content={blog.content} />
          </Page.Content>
        </Page>
      )}
    </>
  );
};

export default BlogDetailPage;
