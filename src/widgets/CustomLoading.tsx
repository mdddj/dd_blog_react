import React from 'react';
import SizedBox from '@/widgets/SizedBox';

const CustomLoading: React.FC = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div>加载中</div>
      <SizedBox height={12} />
    </div>
  );
};

export default CustomLoading;
