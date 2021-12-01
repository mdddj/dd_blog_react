import BaseLayout from '@/components/BaseLayout';
import { blogApi } from '@/util/request';
import Center from '@/widgets/Center';
import MarkdownText from '@/widgets/MarkdownText';
import SizedBox from '@/widgets/SizedBox';
import { Popover, Typography } from '@mui/material';
import { Button, Form, Input, message } from 'antd';
import {
  Result,
  successResultHandle,
} from 'dd_server_api_web/src/utils/ResultUtil';
import { ReactHTMLElement, useState } from 'react';

/// 友链页面
const Friends: React.FC = () => {
  const [ell, setell] = useState<null | HTMLElement>(null);
  const isopen = Boolean(ell);
  const id = isopen ? 'fr-pp' : undefined;

  return (
    <BaseLayout appbarCurrent="友链" hideRight={true}>
      <Center>
        <Button
          onClick={(e) => {
            setell(e.currentTarget);
          }}
        >
          申请友链
        </Button>
      </Center>

      <MarkdownText findKey="friend-page-desc" />

      <Popover
        open={isopen}
        onClose={() => {
          setell(null);
        }}
        anchorEl={ell}
        id={id}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FriendForm
          success={() => {
            setell(null);
          }}
        />
      </Popover>
    </BaseLayout>
  );
};

export default Friends;

/// 提交友链的表单
const FriendForm: React.FC<{ success: () => void }> = (props) => {
  const submit = async (values: any) => {
    const result = await blogApi().saveFriendsLink(values);
    successResultHandle(
      result,
      (d) => {
        message.success(result.message);
        props.success();
      },
      message.error,
    );
  };

  return (
    <div className="base-card" style={{ width: 600 }}>
      <Typography variant="h4">申请友链</Typography>
      <SizedBox height={12} />
      <Form layout="vertical" onFinish={submit}>
        <Form.Item label="名称" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="链接" name="url" required>
          <Input type="url" />
        </Form.Item>
        <Form.Item label="一句话介绍" name="intro" required>
          <Input />
        </Form.Item>
        <Form.Item label="头像" name="logo" required>
          <Input type="url" />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type={'primary'}>
            提交审核
          </Button>
        </Form.Item>
        <p>
          注意：如果重复提交，会先删除以前包含审核通过）的提交记录。如果填写邮箱，会发送审核结果到该邮箱。
        </p>
      </Form>
    </div>
  );
};
