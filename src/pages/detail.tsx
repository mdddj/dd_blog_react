import React, { useState } from 'react';
import { useLocation } from 'umi';
import BlogAppBar from '@/components/AppBar';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Card, CardContent, Container } from '@material-ui/core';
import styles from './index.less';
import { useBoolean, useMount } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';

const api = blogApi();

const BlogDetailPage: React.FC = () => {
  const [blog, setBlog] = useState<BlogData | undefined>();
  const { state, setTrue, setFalse } = useBoolean(false);

  const {
    query: { id, alias },
  } = useLocation() as any;

  // 根据id
  const fetchBlogData = async (id: number) => {
    return await api.getBlogDetailById(id);
  };

  // 根据别名
  const fetchBlogWithAlias = async (alias: string) => {
    return await api.getBlogWithAlias(alias);
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
      {blog && (
        <Container maxWidth={'lg'} className={styles.detailBody}>
          {state && <div>加载中</div>}
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
