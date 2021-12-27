import BaseLayout from '@/components/BaseLayout';
import { blogApi } from '@/util/request';
import { Form, Input, Tabs } from 'antd';
import { useParams } from 'umi';

const { TabPane } = Tabs;
/// 个人中心页面。
const UserPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params; // 用户ID。

  const updateUserProfile = () => {
    blogApi().updateUserProfile({
      id: 0,
      loginNumber: '',
      nickName: '',
      email: null,
      picture: '',
      phone: null,
      loginTime: null,
      type: 0,
      roles: [],
      resourcesCategories: [],
      status: 0,
      salt: '',
    });
  };

  return (
    <>
      <BaseLayout hideRight>
        <Tabs defaultActiveKey="1">
          <TabPane tab="修改用户资料" key="1">
            <Form layout={'vertical'}>
              <Form.Item label="用户昵称" name={'nickName'}>
                <Input />
              </Form.Item>
              <Form.Item label="用户头像" name={'avator'}>
                <Input />
              </Form.Item>
              <Form.Item label="邮箱" name={'email'}>
                <Input />
              </Form.Item>
              <Form.Item label="手机" name={'phone'}>
                <Input />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </BaseLayout>
    </>
  );
};

export default UserPage;
