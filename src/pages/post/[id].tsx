import React, { useState } from 'react';
import { useLocation, useParams } from 'umi';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Avatar, Paper, Typography } from '@mui/material';
import { useBoolean, useMount, useScroll } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import BaseLayout from '@/components/BaseLayout';
import CustomLoading from '@/widgets/CustomLoading';
import { defaultElevation } from '@/config/server';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { history } from 'umi';
import IconSpan from '@/widgets/IconSpan';
import DetailFoot from '@/widgets/DetailFoot';
import { useMediaQuery } from 'react-responsive';
import { Divider, NavBar } from 'antd-mobile';
import SizedBox from '@/widgets/SizedBox';

const api = blogApi();

const BlogDetailPage: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [blog, setBlog] = useState<BlogData | undefined>();
  const { state, setTrue, setFalse } = useBoolean(false);
  const params = useParams<{ id: string }>();
  const { id } = params;

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
      _blog = await fetchBlogData(id as any as number);
    }
    setBlog(_blog?.data);
    setFalse();
  };

  // 启动
  useMount(async () => {
    await fetchData();
  });

  // 重新编辑
  const onEdit = () => {
    if (blog) {
      history.push('/push-blog?id=' + blog.id);
    }
  };

  return (
    <>
      {!isTabletOrMobile && (
        <BaseLayout
          hideRight={true}
          rightContainer={<div className="navigation mt box"></div>}
        >
          {state && <CustomLoading />}

          {blog && (
            <Paper elevation={defaultElevation}>
              {state && <div>加载中</div>}

              <div style={{ padding: 0 }}>
                <Typography
                  variant={'h4'}
                  style={{ fontWeight: 800, marginBottom: 32 }}
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
                  <Avatar
                    alt="梁典典"
                    src={'https://i.imgur.com/kbYvbMt.jpeg'}
                    sx={{ width: 36, height: 36 }}
                  />

                  <Typography
                    style={{
                      color: 'rgb(105, 105, 105)',
                      marginLeft: 5,
                    }}
                  >
                    <span style={{ marginRight: 12, fontWeight: 500 }}>
                      梁典典
                    </span>{' '}
                    发布于 {blog?.dateString}
                  </Typography>

                  <IconSpan text={'编辑'} icon={faEdit} onClick={onEdit} />
                </div>

                <div style={{ width: '100%', display: 'block' }}>
                  <BlogPreview content={blog.content} />
                </div>

                {/* <Pay /> */}
                <DetailFoot />
              </div>
            </Paper>
          )}
        </BaseLayout>
      )}
      {isTabletOrMobile && (
        <>
          {/* 导航 */}
          <NavBar
            back="返回"
            onBack={() => {
              history.goBack();
            }}
            left="首页"
          >
            {blog?.title ?? ''}
          </NavBar>

          <SizedBox height={20} />

          <Divider />

          {/* 正文内容 */}
          <div
            style={{
              padding: 12,
            }}
          >
            <BlogPreview content={blog?.content ?? ''} />
          </div>
        </>
      )}
    </>
  );
};

export default BlogDetailPage;
