import React from 'react';

/**
 * boxsize组件
 * @param width 宽度
 * @param height  高度
 * @constructor
 */
const SizedBox: React.FC<{ width?: number; height?: number }> = ({
  width,
  height,
  children,
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      {children}
    </div>
  );
};
export default SizedBox;
