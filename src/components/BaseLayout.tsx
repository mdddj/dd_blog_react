import { Container, Grid } from '@mui/material';
import React, { ReactNode } from 'react';
import StickyFooter from '@/components/AppFoot';
import BootStrapAppbar from '@/components/appbar/BootStrapAppbar';
import { useMediaQuery } from 'react-responsive';
import BlogAppBar from '@/components/AppBar';

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
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  let mainXs = hideRight || isTabletOrMobile ? 12 : 8;
  const maxWidth = hideRight ? 'md' : 'lg';

  const renderColumnContainer = (
    <Container style={{ marginTop: 30, minHeight: 500 }} maxWidth={maxWidth}>
      <Grid container spacing={3}>
        <Grid item xs={mainXs}>
          {children}
        </Grid>
        {!hideRight && !isTabletOrMobile && (
          <Grid item xs={4}>
            {rightContainer}
          </Grid>
        )}
      </Grid>
    </Container>
  );

  return (
    <>
      <main>
        <BlogAppBar current={appbarCurrent} />
        {/*<BootStrapAppbar current={appbarCurrent} />*/}

        {full && <div>{children}</div>}
        {!full && renderColumnContainer}
      </main>
      <StickyFooter />
    </>
  );
};
export default BaseLayout;
