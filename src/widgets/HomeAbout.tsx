import React, { useState } from 'react';
import '../global.css';
import { SimpleTag } from '@/widgets/MyTag';

/// 我的信息
const person = {
  name: '梁典典',
  avatar: 'https://i.imgur.com/kbYvbMt.jpeg',
  desc: '你好陌生人，欢迎来到我的个人博客。我叫梁典典，性别女，19岁，我正在学习swift ui',
  theme: {
    backgroundColor: '#fff',
  },
};

/// 我的技能
const list = ['Java', 'Flutter', 'Typescript', 'Android'];

// 首页关于我的小卡片
const HomeAbout: React.FC = () => {
  /// 弹窗的html节点
  const [qqEl, setQqEl] = useState<HTMLButtonElement | null>(null);
  /// qq号，微信号
  const [number, setNumber] = useState<string>('');

  const isOpen = Boolean(qqEl);
  const id = isOpen ? 'qqPop' : undefined;

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
    </div>
  );
};

export default HomeAbout;
