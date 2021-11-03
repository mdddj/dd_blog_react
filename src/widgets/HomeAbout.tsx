import React from 'react';
import '../global.css';
import { SimpleTag } from '@/widgets/MyTag';
import { IconButton, Stack } from '@material-ui/core';
import Github from '@geist-ui/react-icons/github';
import MessageCircle from '@geist-ui/react-icons/messageCircle';

/// 我的信息
const person = {
  name: '梁典典',
  avatar: 'https://i.imgur.com/kbYvbMt.jpeg',
  desc: '你好陌生人，欢迎来到我的个人博客。目前在广州一家外贸公司做全职Flutter开发',
  theme: {},
};

/// 我的技能
const list = ['Java', 'Flutter', 'Typescript', 'Android'];

// 首页关于我的小卡片
const HomeAbout: React.FC = () => {
  /// 跳转到github
  const toGithub = () => {
    window.location.href = 'https://github.com/mdddj';
  };

  return (
    <div style={person.theme}>
      <img className="avatar" src={person.avatar} alt={person.name} />
      <h1>{person.name}</h1>
      <p>{person.desc}</p>
      {list.map((v) => (
        <SimpleTag title={v} key={v} />
      ))}
      <Stack direction={'row'} sx={{ mt: 2 }}>
        <IconButton aria-label="微信">
          <MessageCircle />
        </IconButton>
        <IconButton aria-label="github" onClick={toGithub}>
          <Github />
        </IconButton>
      </Stack>
    </div>
  );
};

export default HomeAbout;
