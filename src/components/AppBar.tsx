import * as React from 'react';
import { history } from 'umi';
import { useMount } from '@umijs/hooks';
import { blogApi, getAccessToken } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

interface NavPageRouter {
  label: string;
  router: string;
}

const pages: NavPageRouter[] = [
  {
    label: '首页',
    router: '/',
  },
  {
    label: '动态',
    router: '/dynamic',
  },
  {
    label: '分类',
    router: '/category?t=c',
  },
  {
    label: '归档',
    router: '/category?t=a',
  },
  {
    label: '标签',
    router: '/category?t=t',
  },
  {
    label: '教程',
    router: '/docs',
  },
  {
    label: '友链',
    router: '/friends',
  },
  {
    label: '关于',
    router: '/simple?name=about',
  },
];

/**
 * 通用导航栏组件
 * @returns
 */
const BlogAppBar: React.FC<{ current?: string }> = (_) => {
  /// 存放用户信息，以此来判断用户是否登录成功
  const [user, setUser] = useState<User>();

  /// 菜单的el节点
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  /// 当点击头像后弹出更多操作的菜单
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      history.push('/login');
      return;
    }
    setAnchorEl(event.currentTarget);
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

  ///头像区域
  const renderAvatar = () => {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="账号设置">
          <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
            {user == undefined ? (
              <Avatar alt="U" />
            ) : (
              <Avatar alt="Remy Sharp" src={user.picture} />
            )}
          </IconButton>
        </Tooltip>
        {renderMenu}
      </Box>
    );
  };

  /// 加载用户信息
  const fetchUserInfo = () => {
    let token = getAccessToken();
    if (token.length != 0) {
      blogApi()
        .getUserInfo(token)
        .then((r) => {
          successResultHandle<User>(r, (data) => {
            setUser(data);
          });
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((value) => (
              <NavMenuItem key={value.label} value={value} />
            ))}
          </Box>

          {renderAvatar()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const NavMenuItem: React.FC<{ value: NavPageRouter }> = ({ value }) => {
  return (
    <MenuItem
      key={value.label}
      onClick={() => {
        history.push(value.router);
      }}
    >
      <Typography textAlign="center">{value.label}</Typography>
    </MenuItem>
  );
};

export default BlogAppBar;
