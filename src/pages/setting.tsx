import BaseLayout from '@/components/BaseLayout';
import 'react-markdown-editor-lite/lib/index.css';
import MdEditor from 'react-markdown-editor-lite';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Button, Card, Form, Input, message } from 'antd';
import { useState } from 'react';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { TextModel } from 'dd_server_api_web/apis/model/TextModel';
import SizedBox from '@/widgets/SizedBox';

/// 设置页面
const SettingPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [model, setModel] = useState<TextModel | undefined>();

  const [form] = Form.useForm();

  /// 处理变化
  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  return (
    <BaseLayout>
      <Card
        title={'字典操作'}
        extra={[
          <Form
            layout="inline"
            onFinish={(values: any) => {
              blogApi()
                .getTextByName(values.name)
                .then((r) => {
                  successResultHandle(
                    r,
                    (d) => {
                      message.success('加载成功');
                      setModel(d);
                      setContent(d.context ?? '');
                      form.setFieldsValue({ name: d.name });
                    },
                    message.error,
                  );
                });
            }}
          >
            <Form.Item name="name">
              <Input placeholder="输入关键字" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">加载</Button>
              <Button
                onClick={() => {
                  setModel(undefined);
                  setContent('');
                  form.setFieldsValue({ name: '' });
                }}
                className={'ml'}
              >
                重置
              </Button>
            </Form.Item>
          </Form>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(values: any) => {
            blogApi()
              .saveText({
                name: values.name,
                context: content,
                id: model?.id,
              } as any)
              .then((v) => {
                successResultHandle(
                  v,
                  (d) => {
                    message.success(
                      model?.id == undefined ? '创建成功' : '修改成功',
                    );
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
          <SizedBox height={12} />

          <Form.Item>
            <Button htmlType={'submit'}>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    </BaseLayout>
  );
};

export default SettingPage;
