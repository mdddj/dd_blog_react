import BaseLayout from '@/components/BaseLayout';
import { blogApi } from '@/util/request';
import { Button, Form, Input, message, Tabs } from 'antd';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { useParams } from 'umi';

const { TabPane } = Tabs;
/// 个人中心页面。
const UserPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params; // 用户ID。

  /// 提交
  const submit = async (values: any) => {
    values.id = id;
    const result = await blogApi().updateUserProfile(values);
    successResultHandle(
      result,
      (d) => {
        message.success(result.message);
      },
      message.error,
    );
  };

  return (
    <>
      <BaseLayout hideRight>
        <Tabs defaultActiveKey="1">
          <TabPane tab="修改用户资料" key="1">
            <Form layout={'vertical'} onFinish={submit}>
              <Form.Item label="用户昵称" name={'nickName'}>
                <Input />
              </Form.Item>
              <Form.Item label="用户头像" name={'picture'}>
                <Input />
              </Form.Item>
              <Form.Item label="邮箱" name={'email'}>
                <Input />
              </Form.Item>
              <Form.Item label="手机" name={'phone'}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type={'primary'}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </BaseLayout>
    </>
  );
};

export default UserPage;
