import React from 'react';
import { Loading } from '@geist-ui/react';

const LoadingView: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: 500,
        textAlign: 'center',
      }}
    >
      <Loading />
    </div>
  );
};
export default LoadingView;
