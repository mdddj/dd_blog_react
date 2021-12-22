import { Form, Input } from 'antd';

/// 修改用户密码的小组件。
const UpdatePassComponent: React.FC = () => {
  return (
    <>
      <Form>
        <Form.Item label={'用户名'} name={'username'}>
          <Input />
        </Form.Item>
        <Form.Item label={'密码'} name={'password'}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePassComponent;
