import BaseLayout from '@/components/BaseLayout';
import MarkdownText from '@/widgets/MarkdownText';
import SizedBox from '@/widgets/SizedBox';
import { Typography } from '@mui/material';
import { Button, Form, Input } from 'antd';

/// 友链页面
const Friends: React.FC = () => {
  return (
    <BaseLayout appbarCurrent="友链" rightContainer={<FriendForm />}>
      <Button>申请友链</Button>
      <MarkdownText findKey="friend-page-desc" />
    </BaseLayout>
  );
};

export default Friends;

/// 提交友链的表单
const FriendForm: React.FC = () => {
  return (
    <div className="base-card">
      <Typography>申请友链</Typography>
      <SizedBox height={12} />
      <Form layout="vertical">
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="链接" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="一句话介绍" name="intro">
          <Input />
        </Form.Item>
        <Form.Item label="头像" name="logo">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button>提交审核</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
