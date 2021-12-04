// @ts-ignore
import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import HomeAbout from '@/widgets/HomeAbout';
import MeituanCoupon from '@/components/ad/meituan';
import WebSiteResource from '@/widgets/WebSiteResource';
import BaseLayout from '@/components/BaseLayout';
import MiniAppWidget from '@/widgets/MiniAppWidget';

export default function IndexPage() {
  return (
    <BaseLayout
      appbarCurrent={'index'}
      rightContainer={
        <>
          <HomeAbout />
          {/*<WeChatApp />*/}
          <MiniAppWidget />
          <MeituanCoupon />
          <WebSiteResource />
        </>
      }
    >
      <IndexHomeBlogList />
    </BaseLayout>
  );
}
