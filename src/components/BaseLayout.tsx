import BlogAppBar from '@/components/AppBar';
import { Container, Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import StickyFooter from '@/components/AppFoot';

/// 页面基础布局
const BaseLayout: React.FC<{
  appbarCurrent?: string;
  rightContainer?: ReactNode;
  hideRight?: boolean;
}> = ({ appbarCurrent, children, rightContainer, hideRight }) => {
  const mainXs = hideRight ? 12 : 8;
  const maxWidth = hideRight ? 'md' : 'lg';

  return (
    <>
      <BlogAppBar current={appbarCurrent} />
      <Container style={{ marginTop: 30, minHeight: 500 }} maxWidth={maxWidth}>
        <Grid container spacing={3}>
          <Grid item xs={mainXs}>
            {children}
          </Grid>
          {!hideRight && (
            <Grid item xs={4}>
              {rightContainer}
            </Grid>
          )}
        </Grid>
      </Container>
      <StickyFooter />
    </>
  );
};
export default BaseLayout;
