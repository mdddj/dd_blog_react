import React from 'react';
import BlogAppBar from '@/components/AppBar';
import { Container } from '@material-ui/core';
import styles from './index.less';
import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';

/**
 * 分类页面
 * @constructor
 */
const CategoryPage: React.FC = () => {
  return (
    <>
      <BlogAppBar current="category" />

      <Container maxWidth={'lg'} className={styles.bodyCard}>
        <ArchiveShow title={'分类'} type={ArchiveShowType.Category} />
      </Container>
    </>
  );
};

export default CategoryPage;
