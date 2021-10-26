import React, { useState } from 'react';
import BlogAppBar from '@/components/AppBar';
import { Container, Grid } from '@material-ui/core';
import styles from './index.less';
import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';
import BlogListComponent from '@/components/BlogListComponent';
import { blogApi } from '@/util/request';
import { Category } from 'dd_server_api_web/src/model/result/BlogPushNewResultData';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';

/**
 * 分类页面
 * @constructor
 */
const CategoryPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [cates, setCates] = useState<Category[]>([]);

  return (
    <>
      <BlogAppBar current="category" />

      <Container maxWidth={'lg'} className={styles.bodyCard}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4} xl={3}>
            <ArchiveShow
              title={'分类'}
              type={ArchiveShowType.Category}
              onLoad={(datas) => {
                setCates(datas?.categoryList ?? []);
                setLoaded(true);
              }}
            />
          </Grid>
          <Grid item xs={8} md={8} xl={9}>
            {loaded && (
              <BlogListComponent
                request={(page) => {
                  return new Promise<BlogData[]>(async (resolve) => {
                    const result = await blogApi().getBlogsByCategoryId(
                      cates[0].id,
                      { page: page, pageSize: 12 },
                    );
                    resolve(result.data?.list ?? []);
                  });
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CategoryPage;
