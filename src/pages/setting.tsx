import BaseLayout from '@/components/BaseLayout';
import 'react-markdown-editor-lite/lib/index.css';
import MdEditor from 'react-markdown-editor-lite';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Button, Card, Form, Input, message } from 'antd';
import { useState } from 'react';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';

/// 设置页面
const SettingPage: React.FC = () => {
  const [content, setContent] = useState('');

  /// 处理变化
  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  return (
    <BaseLayout>
      <Card>
        <Form
          layout="vertical"
          onFinish={(values: any) => {
            blogApi()
              .saveText({
                name: values.name,
                context: content,
              } as any)
              .then((v) => {
                successResultHandle(
                  v,
                  (d) => {
                    message.success('创建成功');
                  },
                  (error) => {
                    message.error(error);
                  },
                );
              });
          }}
        >
          <Form.Item label="关键字" name="name">
            <Input />
          </Form.Item>

          <MdEditor
            style={{ height: '300px' }}
            value={content}
            renderHTML={(text) => <BlogPreview content={text} />}
            onChange={handleEditorChange}
          />

          <Form.Item>
            <Button htmlType={'submit'}>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    </BaseLayout>
  );
};

export default SettingPage;
