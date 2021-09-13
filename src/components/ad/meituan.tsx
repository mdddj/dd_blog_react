import React, { useState } from 'react';
import { useMount } from '@umijs/hooks';
import { taokeApi } from '@/util/request';
import MyCard from '@/widgets/MyCard';
import { TMeituanData } from 'dd_server_api_web/apis/model/tk/MeituanData';
import QRCode from 'qrcode.react';
import SizedBox from '@/widgets/SizedBox';

let api = taokeApi();

/**
 * 首页美团领券广告
 * @constructor
 */
const MeituanCoupon: React.FC = () => {
  const [mtData, setMtData] = useState<TMeituanData>();

  useMount(async () => {
    const response = await api.getMeituanCoupon({
      actId: '2',
      linkType: '1',
      miniCode: '1',
    });
    setMtData(response);
  });

  if (mtData) {
    return (
      <>
        <MyCard title={'美团外卖券'}>
          <div>
            <div>
              每天都可以领美团优惠券,大约每单可以优惠4块钱,直接点击下方链接领取或者手机扫码下方二维码
            </div>
            <div>
              <a href={mtData.data}>前往领券</a>
            </div>
            <SizedBox height={12} />
            <SizedBox>
              <QRCode value={mtData.data} size={200} />
            </SizedBox>
          </div>
        </MyCard>
      </>
    );
  }

  return <></>;
};

export default MeituanCoupon;
