import * as React from 'react';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { history } from 'umi';
import Typography from '@material-ui/core/Typography';
import { AppBar, Button } from '@material-ui/core';

export default function BlogAppBar() {
  // 跳转首页
  const toIndex = () => {
    history.push('/');
  };

  // 跳转到分类
  const toCategory = () => {
    history.push('/category');
  };

  // 跳转到归档页面
  const toArchive = () => {
    history.push('/archive');
  };

  // 跳转到标签页面
  const toTags = () => {
    history.push('/tags');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            典典博客
          </Typography>
          <Button color="inherit" onClick={toIndex}>
            首页
          </Button>
          <Button color="inherit" onClick={toCategory}>
            分类
          </Button>
          <Button color="inherit" onClick={toArchive}>
            归档
          </Button>
          <Button color="inherit" onClick={toTags}>
            标签
          </Button>
          <Button color="inherit">关于</Button>
          <Button color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
