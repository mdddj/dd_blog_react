import React, { useState } from 'react';
import { useMount } from '@umijs/hooks';
import { taokeApi } from '@/util/request';
import { TMeituanData } from 'dd_server_api/apis/model/tk/MeituanData';
import MyCard from '@/widgets/MyCard';

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
    console.log(response);
    setMtData(response);
  });
  return (
    <>
      <MyCard title={'美团饿了么'}>
        {mtData && <a href={mtData.data}>美团领券(每天都能领)</a>}
      </MyCard>
    </>
  );
};

export default MeituanCoupon;
