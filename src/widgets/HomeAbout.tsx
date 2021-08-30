import React from 'react';
import styles from './widget.less';

// 首页关于我的小卡片
const HomeAbout: React.FC = () => {
  return (
    <div className={styles.about}>
      <h6 className={styles.title}>关于我</h6>
      <p className={styles.aboutDesc}>
        梁典典,目前在广州做全职Flutter开发,会一点java和前端
      </p>
    </div>
  );
};

export default HomeAbout;
