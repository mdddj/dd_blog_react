import React from 'react';
import img from '/src/assets/xcx.png';
import MyCard from '@/widgets/MyCard';
/**
 * 微信小程序宣传
 * @constructor
 */
const WeChatApp: React.FC = () => {
  return (
    <>
      <MyCard title={'小程序版本'}>
        <img src={img} width="100%" />
      </MyCard>
    </>
  );
};

export default WeChatApp;
