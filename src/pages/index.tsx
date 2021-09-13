// @ts-ignore
import BlogAppBar from '@/components/AppBar';
import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import ArchiveWidget from '@/widgets/ArchiveWidget';
import HomeAbout from '@/widgets/HomeAbout';
import MeituanCoupon from '@/components/ad/meituan';
import { KeepAlive } from '@@/core/umiExports';
import WeChatApp from '@/components/ad/xcx';
import WebSiteResource from '@/widgets/WebSiteResource';
import BaseLayout from '@/components/BaseLayout';
import { Card, CardContent } from '@material-ui/core';

export default function IndexPage() {
  return (
    <BaseLayout
      appbarCurrent={'index'}
      rightContainer={
        <>
          <HomeAbout />
          <WeChatApp />
          <ArchiveWidget />
          <MeituanCoupon />
          <WebSiteResource />
        </>
      }
    >
      <Card>
        <KeepAlive>
          <IndexHomeBlogList />
        </KeepAlive>
      </Card>
    </BaseLayout>
  );
}
