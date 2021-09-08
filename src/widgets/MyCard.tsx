import React from 'react';
import styles from './widget.less';

/**
 * 简单卡片
 * @param title
 * @constructor
 */
const MyCard: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div style={{ marginTop: 30 }}>
      <div className={styles.title}>{title}</div>

      {children}
    </div>
  );
};

export default MyCard;
