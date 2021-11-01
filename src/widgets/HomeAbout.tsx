import React, { useState } from 'react';
import styles from './widget.less';
import {
  IconButton,
  Paper,
  Popover,
  Stack,
  Typography,
} from '@material-ui/core';
import { GithubFilled, QqCircleFilled, WechatFilled } from '@ant-design/icons';

// 首页关于我的小卡片
const HomeAbout: React.FC = () => {
  /// 弹窗的html节点
  const [qqEl, setQqEl] = useState<HTMLButtonElement | null>(null);
  /// qq号，微信号
  const [number, setNumber] = useState<string>('');

  const isOpen = Boolean(qqEl);
  const id = isOpen ? 'qqPop' : undefined;

  /// 跳转到github
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
        <IconButton
          color={'info'}
          onClick={(event) => {
            setNumber('413153189');
            setQqEl(event.currentTarget);
          }}
        >
          <QqCircleFilled />
        </IconButton>

        <IconButton
          color="primary"
          onClick={(event) => {
            setNumber('flutter-null');
            setQqEl(event.currentTarget);
          }}
        >
          <WechatFilled />
        </IconButton>
        <IconButton color="secondary" onClick={toGithub}>
          <GithubFilled />
        </IconButton>
      </Stack>

      {/*qq号*/}
      <Popover
        open={isOpen}
        id={id}
        onClose={() => setQqEl(null)}
        anchorEl={qqEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography>{number}</Typography>
      </Popover>
    </Paper>
  );
};

export default HomeAbout;
