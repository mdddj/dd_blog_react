import * as React from 'react';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { history } from 'umi';
import Typography from '@material-ui/core/Typography';
import { AppBar, Button } from '@material-ui/core';

/**
 * 通用导航栏组件
 * @returns
 */
const BlogAppBar: React.FC<{ current?: string }> = ({ current }) => {
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

  // 前往关于页面
  const toAbout = () => {
    history.push('/simple?name=about');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            典典博客
          </Typography>
          <Button
            onClick={toIndex}
            color={current && current === 'index' ? undefined : 'inherit'}
            variant={current && current === 'index' ? 'contained' : 'text'}
          >
            首页
          </Button>
          <Button
            color={current && current === 'category' ? undefined : 'inherit'}
            variant={current && current === 'category' ? 'contained' : 'text'}
            onClick={toCategory}
          >
            分类
          </Button>
          <Button
            color={current && current === 'archive' ? undefined : 'inherit'}
            variant={current && current === 'archive' ? 'contained' : 'text'}
            onClick={toArchive}
          >
            归档
          </Button>
          <Button
            color={current && current === 'tags' ? undefined : 'inherit'}
            variant={current && current === 'tags' ? 'contained' : 'text'}
            onClick={toTags}
          >
            标签
          </Button>
          <Button
            color={current && current === 'about' ? undefined : 'inherit'}
            variant={current && current === 'about' ? 'contained' : 'text'}
            onClick={toAbout}
          >
            关于
          </Button>
          <Button color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default BlogAppBar;
