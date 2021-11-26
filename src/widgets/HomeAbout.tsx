import React, { useState } from 'react';
import '../global.css';
import { SimpleTag } from '@/widgets/MyTag';
import {
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import Github from '@geist-ui/react-icons/github';
import MessageCircle from '@geist-ui/react-icons/messageCircle';

/// 我的信息
const person = {
  name: '梁典典',
  avatar: 'https://i.imgur.com/kbYvbMt.jpeg',
  desc: '你好陌生人，欢迎来到我的个人博客。',
  theme: {},
};

/// 我的技能
const list = ['Java', 'Flutter', 'Typescript', 'Android'];

// 首页关于我的小卡片
const HomeAbout: React.FC = () => {
  const [open, setOpen] = useState(false);

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
        <IconButton aria-label="联系方式" onClick={() => setOpen(true)}>
          <MessageCircle />
        </IconButton>
        <IconButton aria-label="github" onClick={toGithub}>
          <Github />
        </IconButton>
      </Stack>

      {/*  联系方式弹窗  */}
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth={true}>
        <DialogTitle>联系方式</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem button>
            <ListItemText primary={'QQ:413153189'} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={'微信:flutter-null'} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={'QQ群:667186542'} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default HomeAbout;
