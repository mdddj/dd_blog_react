import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  Fab,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import StickyFooter from '@/components/AppFoot';
import { useMediaQuery } from 'react-responsive';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import { blogApi, getAccessToken } from '@/util/request';
import { history } from '@@/core/history';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { useMount } from '@umijs/hooks';
import ReactDOM from 'react-dom';
import { Anchor } from 'antd';
import HomeAbout from '@/widgets/HomeAbout';
import MiniAppWidget from '@/widgets/MiniAppWidget';
import MeituanCoupon from '@/components/ad/meituan';
import WebSiteResource from '@/widgets/WebSiteResource';

interface NavPageRouter {
  label: string;
  router: string;
}

const kLogoutNavMenuKey = 'action:logout';

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

const userActions = (user?: User): NavPageRouter[] => {
  return [
    {
      label: '发布博客',
      router: '/push-blog',
    },
    {
      label: '个人中心',
      router: '/user/' + user?.id,
    },
    {
      label: '设置',
      router: '/setting',
    },
    {
      label: '退出登录',
      router: kLogoutNavMenuKey,
    },
  ];
};

type Props = {
  appbarCurrent?: string;
  rightContainer?: ReactNode;
  hideRight?: boolean;
  full?: boolean; // 是否为全屏宽度
};

interface WindowProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window | undefined | Node;
  children: React.ReactElement;
}

function ScrollTop(props: WindowProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.

  const trigger = useScrollTrigger({
    target: undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function HideOnScroll(props: WindowProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
/// 页面基础布局
const BaseLayout: React.FC<Props> = (props) => {
  const { children, rightContainer, hideRight, full } = props;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  let mainXs = hideRight || isTabletOrMobile ? 12 : 8;
  const maxWidth = hideRight ? 'md' : 'lg';

  /// 存放用户信息，以此来判断用户是否登录成功
  const [user, setUser] = useState<User>();

  /// 菜单的el节点
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  /// 抽屉打开状态
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // please keep it undefined here to not make useScrollTrigger throw an error on first render
  const [scrollTarget, setScrollTarget] = useState<Node | Window | undefined>(
    undefined,
  );

  ///抽屉菜单
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerIsOpen(open);
    };

  ///组件挂载完毕
  useMount(() => {
    fetchUserInfo();
  });

  ///菜单关闭
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const isMenuOpen = Boolean(anchorEl);
  const profilMenuId = 'primary-search-account-menu';

  const renderColumnContainer = (
    <Container style={{ marginTop: 30, minHeight: 500 }} maxWidth={maxWidth}>
      <Grid container spacing={3}>
        <Grid item xs={mainXs}>
          {children}
        </Grid>
        {!hideRight && !isTabletOrMobile && (
          <Grid item xs={4}>
            {rightContainer}
          </Grid>
        )}
      </Grid>
    </Container>
  );

  /// 当点击头像后弹出更多操作的菜单
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      history.push('/login');
      return;
    }
    setAnchorEl(event.currentTarget);
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

  /// 用户菜单
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={profilMenuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userActions(user).map((value) => (
        <NavMenuItem value={value} key={value.label} />
      ))}
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
              <Avatar alt={user.nickName} src={user.picture} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  return (
    <div
      className={'root-container'}
      ref={(node) => {
        if (node) {
          setScrollTarget(node);
        }
      }}
    >
      <React.Fragment>
        <main>
          <HideOnScroll {...props}>
            <AppBar position={'sticky'} id="back-to-top-anchor">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setDrawerIsOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  典典博客
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((value) => (
                    <NavMenuItem key={value.label} value={value} />
                  ))}
                </Box>

                {renderAvatar()}
                {renderMenu}
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          {full && <div>{children}</div>}
          {!full && renderColumnContainer}
          <Drawer
            anchor={'left'}
            open={drawerIsOpen}
            onClose={() => toggleDrawer(false)}
          >
            <BaseDrawerLayout boxClick={() => setDrawerIsOpen(false)} />
          </Drawer>
        </main>
        <StickyFooter />
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    </div>
  );
};

const BaseDrawerLayout: React.FC<{ boxClick?: () => void }> = ({
  boxClick,
}) => {
  return (
    <Box sx={{ width: 500, p: 2 }} onClick={boxClick} role="presentation">
      <>
        <HomeAbout />
        {/*<WeChatApp />*/}
        <MiniAppWidget />
        <MeituanCoupon />
        <WebSiteResource />
      </>
    </Box>
  );
};

const NavMenuItem: React.FC<{ value: NavPageRouter }> = ({ value }) => {
  return (
    <MenuItem
      key={value.label}
      onClick={async () => {
        if (value.label == kLogoutNavMenuKey) {
          //退出登录
          await blogApi().logout();
          return;
        }
        history.push(value.router);
      }}
    >
      <Typography textAlign="center">{value.label}</Typography>
    </MenuItem>
  );
};

export default BaseLayout;
