import React, { useState } from 'react';
import { useLocation } from 'umi';
import BlogAppBar from '@/components/AppBar';
import { getBlogDetailById, getBlogWithAlias } from '@/service/Blog';
import { Blog } from '@/model/BlogModel';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Card, CardContent, Container } from '@material-ui/core';
import styles from './index.less';
import { useBoolean, useMount } from '@umijs/hooks';

const BlogDetailPage: React.FC = () => {
  const [blog, setBlog] = useState<Blog | undefined>();
  const { state, setTrue, setFalse } = useBoolean(false);

  const {
    query: { id, alias },
  } = useLocation() as any;

  // 根据id
  const fetchBlogData = async (id: number) => {
    return await getBlogDetailById(id);
  };

  // 根据别名
  const fetchBlogWithAlias = async (alias: string) => {
    return await getBlogWithAlias(alias);
  };

  // 加载数据
  const fetchData = async () => {
    let _blog;
    setTrue();
    if (id) {
      _blog = await fetchBlogData(id as number);
    }
    if (alias) {
      _blog = await fetchBlogWithAlias(alias as string);
    }
    setBlog(_blog?.data);
    setFalse();
  };

  // 启动
  useMount(async () => {
    await fetchData();
  });

  return (
    <>
      <BlogAppBar />
      <div className={styles.ribbon} />

      {state && <div>加载中</div>}

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
    </>
  );
};

export default BlogDetailPage;
