import React, { useState } from 'react';
import BlogAppBar from '@/components/AppBar';
import { Container } from '@material-ui/core';
import styles from '@/pages/index.less';
import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import { PagerModel } from 'dd_server_api_web/apis/utils/ResultUtil';
import { blogApi } from '@/util/request';
import { Tag } from 'dd_server_api_web/apis/model/ArchiveModel';
import { Grid } from '@mui/material';
import BlogListComponent from '@/components/BlogListComponent';

// 标签页面
const TagPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  /// 存放博客列表的数据
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  /// 存放分页的数据
  const [pager, setPager] = useState<PagerModel>();

  /// 存放当前选中的分类数据
  const [currTag, setCurrTag] = useState<Tag>();

  /// 加载博客数据
  /// id 为标签的id
  const fetchBlogsData = async (page: number, id: number) => {
    setLoaded(false);
    const result = await blogApi().getBlogsByTagId(id, {
      page: page,
      pageSize: 10,
    });
    setPager(result.data?.page);
    let data = result.data?.list ?? [];
    setBlogs(data);
    setLoaded(true);
  };

  return (
    <>
      <BlogAppBar current="tags" />

      <Container maxWidth={'lg'} className={styles.bodyCard}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4} xl={3}>
            <ArchiveShow
              title={'标签'}
              type={ArchiveShowType.Tag}
              onLoad={async (datas) => {
                if (datas && datas.tags.length != 0) {
                  setCurrTag(datas.tags[0]);
                  await fetchBlogsData(1, datas.tags[0].id);
                }
              }}
              onTagSelect={async (tag) => {
                setCurrTag(tag);
                await fetchBlogsData(1, tag.id);
              }}
            />
          </Grid>

          <Grid item xs={8} md={8} xl={9}>
            {currTag && <h1>{currTag.name}</h1>}
            <BlogListComponent
              blogs={blogs}
              onPageChange={async (page) => {
                await fetchBlogsData(page, currTag!.id);
              }}
              pager={pager}
            />
            <Grid />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TagPage;
