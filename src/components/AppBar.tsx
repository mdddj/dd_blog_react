import * as React from 'react';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { history } from 'umi';
import Typography from '@material-ui/core/Typography';
import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
} from '@material-ui/core';
import { useMount } from '@umijs/hooks';
import { blogApi, getAccessToken } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import { useState } from 'react';

/**
 * 通用导航栏组件
 * @returns
 */
const BlogAppBar: React.FC<{ current?: string }> = ({ current }) => {
  /// 存放用户信息，以此来判断用户是否登录成功
  const [user, setUser] = useState<User>();

  /// 菜单的el节点
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  /// 加载中
  const [loading, setLoading] = useState<boolean>(false);

  /// 当点击头像后弹出更多操作的菜单
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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

  useMount(() => {
    fetchUserInfo();
  });
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const isMenuOpen = Boolean(anchorEl);
  const profilMenuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={profilMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push('/r');
        }}
      >
        发布博客
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>退出登录</MenuItem>
    </Menu>
  );

  /// 加载用户信息
  const fetchUserInfo = () => {
    let token = getAccessToken();
    if (token.length != 0) {
      setLoading(true);
      blogApi()
        .getUserInfo(token)
        .then((r) => {
          successResultHandle<User>(r, (data) => {
            setUser(data);
          });
          setLoading(false);
        });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            典典博客
          </Typography>
          <Stack
            direction={'row'}
            spacing={2}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
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
            {!user && loading && (
              <Button
                color="inherit"
                onClick={loading ? undefined : () => history.push('/login')}
              >
                {loading ? '登录中' : '登录'}
              </Button>
            )}
            {user && (
              <Avatar src={user.picture} onClick={handleProfileMenuOpen} />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default BlogAppBar;
