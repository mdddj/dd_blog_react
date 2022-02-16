import {
  AppBar,
  Container,
  CssBaseline,
  Grid,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import React, { ReactNode } from 'react';
import StickyFooter from '@/components/AppFoot';
import { useMediaQuery } from 'react-responsive';
import BlogAppBar from '@/components/AppBar';
import SizedBox from '@/widgets/SizedBox';

type Props = {
  appbarCurrent?: string;
  rightContainer?: ReactNode;
  hideRight?: boolean;
  full?: boolean; // 是否为全屏宽度
};

interface WindowProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: WindowProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  console.log('开关' + trigger);

  return React.cloneElement(children, {
    elevation: trigger ? 10 : 0,
  });
}
/// 页面基础布局
const BaseLayout: React.FC<Props> = (props) => {
  const { appbarCurrent, children, rightContainer, hideRight, full } = props;
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
    <React.Fragment>
      <main>
        <HideOnScroll {...props}>
          <AppBar position={'fixed'}>
            <BlogAppBar current={appbarCurrent} />
          </AppBar>
        </HideOnScroll>
        <SizedBox height={100} />
        {full && <div>{children}</div>}
        {!full && renderColumnContainer}
      </main>
      <StickyFooter />
    </React.Fragment>
  );
};
export default BaseLayout;
