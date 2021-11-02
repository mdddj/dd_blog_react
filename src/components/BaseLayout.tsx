import BlogAppBar from '@/components/AppBar';
import { Container, Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import StickyFooter from '@/components/AppFoot';
import BootStrapAppbar from '@/components/appbar/BootStrapAppbar';

type Props = {
  appbarCurrent?: string;
  rightContainer?: ReactNode;
  hideRight?: boolean;
  full?: boolean; // 是否为全屏宽度
};

/// 页面基础布局
const BaseLayout: React.FC<Props> = ({
  appbarCurrent,
  children,
  rightContainer,
  hideRight,
  full,
}) => {
  const mainXs = hideRight ? 12 : 8;
  const maxWidth = hideRight ? 'md' : 'lg';

  const renderColumnContainer = (
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
  );

  return (
    <>
      {/*<BlogAppBar current={appbarCurrent} />*/}
      <BootStrapAppbar />

      {full && <div>{children}</div>}
      {!full && renderColumnContainer}
      <StickyFooter />
    </>
  );
};
export default BaseLayout;
