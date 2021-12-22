import { TabBar } from 'antd-mobile';
import {
  AppOutline,
  UnorderedListOutline,
  MessageFill,
  MessageOutline,
  UserOutline,
} from 'antd-mobile-icons';

const PhoneNavbar: React.FC = () => {
  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: 'todo',
      title: '我的待办',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: 'message',
      title: '我的消息',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ];

  return (
    <>
      <TabBar>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
};

export default PhoneNavbar;
