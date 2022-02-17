// @ts-ignore
import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import HomeAbout from '@/widgets/HomeAbout';
import MeituanCoupon from '@/components/ad/meituan';
import WebSiteResource from '@/widgets/WebSiteResource';
import BaseLayout from '@/components/BaseLayout';
import MiniAppWidget from '@/widgets/MiniAppWidget';
import { useMediaQuery } from 'react-responsive';
import PhoneIndex from './phone/home';

export default function IndexPage() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <>
      {!isTabletOrMobile && (
        <BaseLayout
          appbarCurrent={'index'}
          hideRight={true}
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
      )}

      {isTabletOrMobile && <PhoneIndex />}
    </>
  );
}
