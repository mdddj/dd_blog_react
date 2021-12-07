import * as React from 'react';
import { history } from 'umi';
import { useMount } from '@umijs/hooks';
import { blogApi, getAccessToken } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import { useState } from 'react';
import Loading from '@/Loading';
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

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
            <span
              onClick={toIndex}
              color={current && current === 'index' ? undefined : 'blue'}
            >
              首页
            </span>
            <span
              color={current && current === 'category' ? undefined : 'blue'}
              onClick={toCategory}
            >
              分类
            </span>
            <span
              color={current && current === 'archive' ? undefined : 'blue'}
              onClick={toArchive}
            >
              归档
            </span>
            <span
              color={current && current === 'tags' ? undefined : 'blue'}
              onClick={toTags}
            >
              标签
            </span>
            <span
              color={current && current === 'about' ? undefined : 'blue'}
              onClick={toAbout}
            >
              关于
            </span>
            {!user && !loading && (
              <span
                color="blue"
                onClick={loading ? undefined : () => history.push('/login')}
              >
                登录
              </span>
            )}
            {loading && <Loading />}
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
