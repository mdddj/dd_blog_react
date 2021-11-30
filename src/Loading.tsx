import React from 'react';

const LoadingView: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: 500,
        textAlign: 'center',
      }}
    >
      <span>加载中</span>
    </div>
  );
};
export default LoadingView;
