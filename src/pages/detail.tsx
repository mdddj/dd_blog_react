import React from 'react';
import { useLocation } from 'umi';
import BlogAppBar from '@/components/AppBar';
import { useMount, useRequest } from '@umijs/hooks';
import { getBlogDetailById } from '@/service/Blog';
import { Result } from '@/model/Result';
import { Blog } from '@/model/BlogModel';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Card, CardContent, Container, ThemeProvider } from '@material-ui/core';
import styles from './index.less';
import { whiteTheme } from '@/config/theme';

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
    <ThemeProvider theme={whiteTheme}>
      <BlogAppBar />
      <div className={styles.ribbon} />
      {blog && (
        <Container maxWidth={'lg'} className={styles.detailBody}>
          <Card className={styles.detailCard}>
            <CardContent>
              <h2>{blog.title}</h2>
              <BlogPreview content={blog.content} />
            </CardContent>
          </Card>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default BlogDetailPage;
