import React from 'react';
import BlogAppBar from '@/components/AppBar';
import { Container } from '@material-ui/core';
import styles from '@/pages/index.less';
import ArchiveShow, { ArchiveShowType } from '@/components/ArchiveShow';

//归档页面
const ArchivePage: React.FC = () => {
  return (
    <>
      <BlogAppBar current="archive" />

      <Container maxWidth={'lg'} className={styles.bodyCard}>
        <ArchiveShow title={'归档'} type={ArchiveShowType.Archive} />
      </Container>
    </>
  );
};

export default ArchivePage;
