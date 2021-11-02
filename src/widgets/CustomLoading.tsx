import React from 'react';
import SizedBox from '@/widgets/SizedBox';
import { Loading } from '@geist-ui/react';

const CustomLoading: React.FC = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div>加载中</div>
      <SizedBox height={12} />
      <Loading />
    </div>
  );
};

export default CustomLoading;
