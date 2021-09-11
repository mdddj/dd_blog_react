import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import styles from './components.less';
import { useBoolean, useMount } from '@umijs/hooks';
import Pager from './Pager';
import { blogApi } from '@/util/request';
import MaterialBlogCard from '@/components/MaterialBlogCard';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import { responseIsSuccess } from 'dd_server_api_web/apis/utils/ResultUtil';

const IndexHomeBlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [maxCount, setMaxCount] = useState<number>(0);
  const { state, setTrue, setFalse } = useBoolean(true);

  // 加载数据
  const fetchData = async (page: number) => {
    setTrue();
    const result = await blogApi().getBlogList(page, 4);
    if (responseIsSuccess(result)) {
      setBlogs(result.data?.list ?? []);
      setMaxCount(result.data?.page.maxPage ?? 0);
    }
    setFalse();
  };

  // 组件挂载生命周期
  useMount(async () => {
    await fetchData(1);
  });

  return (
    <>
      <div style={{ marginBottom: 30 }}>
        {/*{!state &&*/}
        {/*  blogs.map((item) => <SimpleBlogListItem key={item.id} blog={item} />)}*/}

        {!state &&
          blogs.map((item) => <MaterialBlogCard key={item.id} blog={item} />)}

        {state ? (
          <Box sx={{ display: 'flex' }} className={styles.loading}>
            <CircularProgress />
          </Box>
        ) : (
          <span />
        )}

        {
          <div style={{ textAlign: 'center', padding: 12 }}>
            <Pager
              count={maxCount}
              onChangePage={async (page) => {
                console.log(page);
                await fetchData(page);
              }}
            />
          </div>
        }
      </div>
    </>
  );
};

export default IndexHomeBlogList;
