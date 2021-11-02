import React from 'react';
import './appbar.css';
import { history } from 'umi';

const BootStrapAppbar: React.FC = () => {
  return (
    <div className={'top-bar'}>
      <h5 className={'top-bar-h5'} onClick={() => history.push('/')}>
        梁典典的博客
      </h5>
      <nav>
        <a href="/">首页</a>
        <a href="/category">分类</a>
        <a href="/archive">归档</a>
        <a href="/tags">标签</a>
        <a href="/simple?name=about">关于</a>
      </nav>
      <a href="/login">登录</a>
    </div>
  );
};

export default BootStrapAppbar;