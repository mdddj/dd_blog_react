import React, { useState } from 'react';
import { getBlogList } from '@/service/Blog';
import { Blog } from '@/model/BlogModel';
import BlogCardLayout from '@/components/BlogCardLayout';
import Pager from '@/components/Pager';
import { useMount } from '@umijs/hooks';
import { Card, Page } from '@geist-ui/react';
import { responseIsSuccess } from '@/model/Result';
import { Container } from '@material-ui/core';

const IndexHomeBlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [maxCount, setMaxCount] = useState<number>(0);

  // 加载数据
  const fetchData = async (page: number) => {
    const result = await getBlogList(page, 4);
    if (responseIsSuccess(result)) {
      setBlogs(result.data.list);
      setMaxCount(result.data.page.maxPage);
    }
  };

  // 组件挂载生命周期
  useMount(async () => {
    await fetchData(1);
  });

  return (
    <Container maxWidth={'lg'}>
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        {blogs.map((item) => (
          <BlogCardLayout key={item.id} blog={item} />
        ))}

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
    </Container>
  );
};

export default IndexHomeBlogList;
