// @ts-ignore
import BlogAppBar from '@/components/AppBar';
import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import ArchiveWidget from '@/widgets/ArchiveWidget';
import HomeAbout from '@/widgets/HomeAbout';
import { Alert, AlertTitle, Container, Grid } from '@material-ui/core';
import MeituanCoupon from '@/components/ad/meituan';
import { KeepAlive } from '@@/core/umiExports';
import WeChatApp from '@/components/ad/xcx';
import WebSiteResource from '@/widgets/WebSiteResource';

export default function IndexPage() {
  return (
    <>
      <BlogAppBar current="index" />
      <Container style={{ marginTop: 30 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <KeepAlive>
              <IndexHomeBlogList />
            </KeepAlive>
            <div style={{ height: 50 }} />
          </Grid>
          <Grid item xs={4}>
            <HomeAbout />
            <WeChatApp />
            <ArchiveWidget />
            <MeituanCoupon />
            <WebSiteResource />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
