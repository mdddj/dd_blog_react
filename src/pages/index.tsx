// @ts-ignore
import BlogAppBar from '@/components/AppBar';
import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import HomeAbout from '@/widgets/HomeAbout';
import MeituanCoupon from '@/components/ad/meituan';
import { KeepAlive } from '@@/core/umiExports';
import WeChatApp from '@/components/ad/xcx';
import WebSiteResource from '@/widgets/WebSiteResource';
import BaseLayout from '@/components/BaseLayout';

export default function IndexPage() {
  return (
    <BaseLayout
      appbarCurrent={'index'}
      rightContainer={
        <>
          <HomeAbout />
          {/*<WeChatApp />*/}
          <MeituanCoupon />
          <WebSiteResource />
        </>
      }
    >
      <KeepAlive>
        <IndexHomeBlogList />
      </KeepAlive>
    </BaseLayout>
  );
}
