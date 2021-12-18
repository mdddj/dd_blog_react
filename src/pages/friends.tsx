import BaseLayout from '@/components/BaseLayout';
import { blogApi } from '@/util/request';
import Center from '@/widgets/Center';
import MarkdownText from '@/widgets/MarkdownText';
import SizedBox from '@/widgets/SizedBox';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import { useMount } from '@umijs/hooks';
import { Button, Form, Input, message } from 'antd';
import { Friend } from 'dd_server_api_web/apis/model/friend';
import {
  Result,
  successResultHandle,
} from 'dd_server_api_web/src/utils/ResultUtil';
import React, { ReactHTMLElement, useState } from 'react';

/// 友链页面
const Friends: React.FC = () => {
  const [ell, setell] = useState<null | HTMLElement>(null);
  const isopen = Boolean(ell);
  const id = isopen ? 'fr-pp' : undefined;

  // 已通过审核的友链列表
  const [friends, setFriends] = useState<Friend[]>([]);

  useMount(() => {
    fetchAllFriends();
  });

  /// 获取全部友链
  const fetchAllFriends = async () => {
    let result = await blogApi().getFriends({ status: 1 });
    console.log(result);
    setFriends(result?.data ?? []);
  };

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

      {/* 显示友链的列表 */}
      <SizedBox height={20} />
      <Typography variant="h4" gutterBottom component="div">
        友链
      </Typography>
      <List>
        {friends.map((v) => (
          <FriendItemLayout friend={v} key={v.id} />
        ))}
      </List>

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

/// 友链的item布局
const FriendItemLayout: React.FC<{ friend: Friend }> = ({ friend }) => {
  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        onClick={() => {
          window.open(friend.url, '_blank');
        }}
      >
        <ListItemAvatar>
          <Avatar alt={friend.name} src={friend.logo} />
        </ListItemAvatar>
        <ListItemText
          primary={friend.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
              {friend.intro}
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </>
  );
};

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
