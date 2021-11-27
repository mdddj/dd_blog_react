import React, { useState } from 'react';
import './appbar.css';
import { history, Link } from 'umi';
import UserStateTipWidget from '@/widgets/UserStateTipWidget';
import { Menu, MenuItem } from '@mui/material';
import { blogApi } from '@/util/request';

//参数
type Props = {
  current?: string;
};

//网站导航条
const BootStrapAppbar: React.FC<Props> = ({ current }) => {
  const [menuEl, setMenuEl] = useState<HTMLElement | null>();

  const isOpen = Boolean(menuEl);
  /// 获取高亮样式
  const getStyle = (routeName: string): string => {
    return current && current == routeName ? 'nav-active' : '';
  };

  return (
    <div className={'top-bar'}>
      <h5 className={'top-bar-h5'} onClick={() => history.push('/')}>
        梁典典的博客
      </h5>
      <nav>
        <Link to="/" className={getStyle('index')}>
          首页
        </Link>
        <Link to="/dynamic" className={getStyle('动态')}>
          动态
        </Link>
        <Link to="/category?t=c" className={getStyle('分类')}>
          分类
        </Link>
        <Link to="/category?t=a" className={getStyle('归档')}>
          归档
        </Link>
        <Link to="/category?t=t" className={getStyle('标签')}>
          标签
        </Link>
        <Link to="/friends" className={getStyle('友链')}>
          友链
        </Link>
        <Link to="/simple?name=about" className={getStyle('about')}>
          关于
        </Link>
      </nav>
      <UserStateTipWidget
        logined={(user) => {
          return (
            <span
              onClick={(e) => {
                setMenuEl(e.currentTarget);
              }}
            >
              欢迎你:{user.nickName}
            </span>
          );
        }}
      >
        <Link to="/login" className={getStyle('login')}>
          登录
        </Link>
      </UserStateTipWidget>
      <Menu
        id="basic-menu"
        anchorEl={menuEl}
        open={isOpen}
        onClose={() => setMenuEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            history.push('/push-blog');
          }}
        >
          发布博客
        </MenuItem>
        <MenuItem onClick={() => {}}>设置</MenuItem>
        <MenuItem
          onClick={async () => {
            await blogApi().logout();
          }}
        >
          退出登录
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BootStrapAppbar;
