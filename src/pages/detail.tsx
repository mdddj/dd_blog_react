import React, { useState } from 'react';
import { history, useLocation } from 'umi';
import BlogAppBar from '@/components/AppBar';
import { BlogPreview } from '@/components/MarkdownPreview';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from '@material-ui/core';
import styles from './index.less';
import { useBoolean, useMount } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import BaseLayout from '@/components/BaseLayout';
import SizedBox from '@/widgets/SizedBox';
import CustomLoading from '@/widgets/CustomLoading';

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
    <BaseLayout>
      {!state && (
        <div>
          <div>
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              返回
            </Button>
          </div>
          <SizedBox height={12} />
        </div>
      )}

      {state && <CustomLoading />}

      {blog && (
        <>
          {state && <div>加载中</div>}
          <Card className={styles.detailCard}>
            <CardContent>
              <h2>{blog.title}</h2>
              <BlogPreview content={blog.content} />
            </CardContent>
          </Card>
        </>
      )}
    </BaseLayout>
  );
};

export default BlogDetailPage;
