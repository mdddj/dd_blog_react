import React from 'react';
import styles from './widget.less';
import { IconButton, Paper, Stack } from '@material-ui/core';
import { GithubFilled, QqCircleFilled, WechatFilled } from '@ant-design/icons';

// 首页关于我的小卡片
const HomeAbout: React.FC = () => {
  const toGithub = () => {
    window.location.href = 'https://github.com/mdddj';
  };

  return (
    <Paper className={styles.about} elevation={0}>
      <h6 className={styles.title}>关于我</h6>
      <p className={styles.aboutDesc}>
        梁典典,目前在广州做全职Flutter开发,会一点java和前端
      </p>
      <Stack
        direction="row"
        spacing={2}
        style={{ textAlign: 'center', marginTop: 12 }}
      >
        <IconButton color={'info'}>
          <QqCircleFilled />
        </IconButton>
        <IconButton color="primary">
          <WechatFilled />
        </IconButton>
        <IconButton color="secondary" onClick={toGithub}>
          <GithubFilled />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default HomeAbout;
