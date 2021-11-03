import React from 'react';
import './appbar.css';
import { history, Link } from 'umi';

//参数
type Props = {
  current?: string;
};

//网站导航条
const BootStrapAppbar: React.FC<Props> = ({ current }) => {
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
        <Link to="/category?t=c" className={getStyle('分类')}>
          分类
        </Link>
        <Link to="/category?t=a" className={getStyle('归档')}>
          归档
        </Link>
        <Link to="/category?t=t" className={getStyle('标签')}>
          标签
        </Link>
        <Link to="/simple?name=about" className={getStyle('about')}>
          关于
        </Link>
      </nav>
      <Link to="/login" className={getStyle('login')}>
        登录
      </Link>
    </div>
  );
};

export default BootStrapAppbar;
