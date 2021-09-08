import MyCard from '@/widgets/MyCard';
import React from 'react';

/**
 * 本站源码显示小部件
 * @constructor
 */
const WebSiteResource: React.FC = () => {
  return (
    <MyCard title={'本站源码'}>
      <a href={'https://github.com/mdddj/dd_blog_react'}>去看看</a>
    </MyCard>
  );
};
export default WebSiteResource;
