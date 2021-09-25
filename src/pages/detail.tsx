import React, { useState } from 'react';
import { history, useLocation } from 'umi';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Avatar, Button, Typography } from '@material-ui/core';
import { useBoolean, useMount } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import BaseLayout from '@/components/BaseLayout';
import SizedBox from '@/widgets/SizedBox';
import CustomLoading from '@/widgets/CustomLoading';
import { ArrowBackIos } from '@material-ui/icons';
import ava from '/src/assets/ava.jpg';

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
    <BaseLayout hideRight={true}>
      {!state && (
        <div>
          <div>
            <Button
              onClick={() => {
                history.goBack();
              }}
              startIcon={<ArrowBackIos />}
              color={'secondary'}
              style={{ marginBottom: 32, color: 'blue' }}
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

          <div>
            <Typography
              style={{
                color: '#2F3A45',
              }}
            >
              {blog?.dateString}
            </Typography>

            <Typography
              variant={'h3'}
              style={{ fontWeight: 800, marginBottom: 32, marginTop: 16 }}
            >
              {blog.title}
            </Typography>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 38,
              }}
            >
              <Avatar alt="梁典典" src={ava} sx={{ width: 36, height: 36 }} />
              <span style={{ marginLeft: 12, fontWeight: 500 }}>梁典典</span>
            </div>

            <BlogPreview content={blog.content} />
          </div>
        </>
      )}
    </BaseLayout>
  );
};

export default BlogDetailPage;
