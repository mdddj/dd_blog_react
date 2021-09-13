import BlogAppBar from '@/components/AppBar';
import { Container, Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import StickyFooter from '@/components/AppFoot';

/// 页面基础布局
const BaseLayout: React.FC<{
  appbarCurrent?: string;
  rightContainer?: ReactNode;
}> = ({ appbarCurrent, children, rightContainer }) => {
  return (
    <div>
      <BlogAppBar current={appbarCurrent} />
      <Container style={{ marginTop: 30 }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {children}
          </Grid>
          <Grid item xs={4}>
            {rightContainer}
          </Grid>
        </Grid>
      </Container>
      <StickyFooter />
    </div>
  );
};
export default BaseLayout;
