import React from 'react';
import BlogAppBar from '@/components/AppBar';
import { Container } from '@material-ui/core';
import styles from '@/pages/index.less';
import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';

// 标签页面
const TagPage: React.FC = () => {
  return (
    <>
      <BlogAppBar current="tags" />

      <Container maxWidth={'lg'} className={styles.bodyCard}>
        <ArchiveShow title={'标签'} type={ArchiveShowType.Tag} />
      </Container>
    </>
  );
};

export default TagPage;
