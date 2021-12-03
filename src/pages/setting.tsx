import BaseLayout from '@/components/BaseLayout';
import 'react-markdown-editor-lite/lib/index.css';
import MdEditor from 'react-markdown-editor-lite';
import { BlogPreview } from '@/components/MarkdownPreview';
import {
  Button,
  Form,
  Input,
  message,
  Popover,
  Select,
  Space,
  Tabs,
} from 'antd';
import { useState } from 'react';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { TextModel } from 'dd_server_api_web/apis/model/TextModel';
import SizedBox from '@/widgets/SizedBox';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import { Category } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import { useMount } from '@umijs/hooks';
import { Friend } from 'dd_server_api_web/apis/model/friend';
import SendEmail from '@/widgets/SendEmail';
import ResourceCategorySetting from '@/components/setting/ResourceCategorySetting';
const { Option } = Select;
const { TabPane } = Tabs;

function TabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/// 设置页面
const SettingPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <BaseLayout hideRight>
      <Box sx={{ width: '100%' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="字典" key="1">
            <TextForm />
          </TabPane>
          <TabPane tab="分类" key="2">
            <CategoryForm />
          </TabPane>
          <TabPane tab="友链" key="3">
            <FriendShenhe />
          </TabPane>
          <TabPane tab="资源" key="4">
            <ResourceCategorySetting />
          </TabPane>
        </Tabs>
      </Box>
    </BaseLayout>
  );
};

export default SettingPage;

/// 友链的审核
const FriendShenhe: React.FC = () => {
  const [list, setList] = useState<Friend[]>([]);
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const [email, setEmail] = useState('');

  useMount(() => {
    fetch();
  });

  const fetch = () => {
    blogApi()
      .getFriends({ state: 0 })
      .then((r) => {
        successResultHandle(
          r,
          (d) => {
            setList(d);
          },
          message.error,
        );
      });
  };

  return (
    <>
      {list.length == 0 && <span>暂无需要审核的友链</span>}
      {list.map((v) => {
        return (
          <div key={v.id} className="border-bottom mt">
            <div>名称：{v.name}</div>
            <div>链接：{v.url}</div>
            <div>介绍：{v.intro}</div>
            <div>logo：{v.logo}</div>
            <div>邮箱：{v.email}</div>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  v.state = 1;
                  blogApi()
                    .updateFriendsObject(v)
                    .then((r) => {
                      successResultHandle(
                        r,
                        (d) => {
                          message.success(r.message);
                          fetch();
                        },
                        message.error,
                      );
                    });
                }}
              >
                审核通过
              </Button>
              <Button
                disabled={!v.email || v.email == ''}
                onClick={() => {
                  setEmail(v.email ?? '');
                  setDialogOpenState(true);
                }}
              >
                邮件通知
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  blogApi()
                    .deleteFriendObject(v.id)
                    .then((r) => {
                      successResultHandle(
                        r,
                        (d) => {
                          message.success(r.data);
                          fetch();
                        },
                        message.error,
                      );
                    });
                }}
              >
                删除
              </Button>
            </Space>
          </div>
        );
      })}

      {/* 发送邮件的弹窗 */}
      <Dialog
        open={dialogOpenState}
        onClose={() => setDialogOpenState(false)}
        maxWidth={'lg'}
        fullWidth
      >
        <DialogTitle>发送邮件</DialogTitle>
        <DialogContent>
          <SendEmail
            email={email}
            title={'梁典典的博客友链审核结果通知:【】'}
            content={
              '🎉恭喜，你在https://itbug.shop梁典典的博客中申请的友链已经通过。'
            }
            success={() => {
              setDialogOpenState(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

/// 分类的修改或者增加表单
const CategoryForm: React.FC = () => {
  const [form] = Form.useForm();

  const [category, setCategory] = useState<Category | undefined>();

  return (
    <>
      {/* 加载一个分类 */}
      <Form
        layout="inline"
        onFinish={(values) => {
          blogApi()
            .findBlogCategoryByName(values.name)
            .then((res) => {
              successResultHandle(
                res,
                (d) => {
                  form.setFieldsValue(d);
                  message.success(res.message);
                  setCategory(d);
                },
                message.error,
              );
            });
        }}
      >
        <Form.Item label="输入分类名" name={'name'}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">加载</Button>
          <Button
            onClick={() => {
              setCategory(undefined);
              message.success('重置成功');
              form.resetFields();
            }}
          >
            重置
          </Button>
        </Form.Item>
      </Form>

      <SizedBox height={30} />
      {/* 新增的表单 */}
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          if (category) {
            values.id = category.id;
          }
          blogApi()
            .saveAndUpdateBlogCategory(values)
            .then((r) => {
              successResultHandle(
                r,
                (_) => {
                  message.success(r.message);
                  form.resetFields();
                },
                message.error,
              );
            });
        }}
      >
        <Form.Item label="分类名称" name={'name'} required>
          <Input />
        </Form.Item>

        <Form.Item label="分类图标" name={'logo'} required>
          <Input />
        </Form.Item>

        <Form.Item label="分类介绍" name={'intro'} required>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">
            {category ? '修改' : '创建一个新分类'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

/// 字典的编辑表单
const TextForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [model, setModel] = useState<TextModel | undefined>();
  const [list, setList] = useState<TextModel[]>([]);
  const [openP, setOpenP] = useState(false);

  const [form] = Form.useForm();
  /// 处理变化
  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  useMount(() => fetch());

  const fetch = () => {
    blogApi()
      .getTextList(0, 1000)
      .then((r) => {
        setList(r.data?.list ?? []);
        message.success('加载成功');
      });
  };

  return (
    <Box>
      {/* 加载区域 */}
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
          <Select style={{ width: 120 }} onChange={(v) => {}}>
            {list.map((item) => (
              <Option value={item.name} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
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

          <Button
            onClick={() => {
              fetch();
            }}
            className={'ml'}
          >
            刷新
          </Button>

          <Popover
            content={
              <a
                onClick={() => {
                  if (model) {
                    blogApi()
                      .deleteTextById(`${model.id}`)
                      .then((r) => {
                        successResultHandle(
                          r,
                          (d) => {
                            message.success(d);
                            fetch();
                          },
                          message.error,
                        );
                      });
                  }
                }}
              >
                删除
              </a>
            }
            title="确定删除吗？"
            visible={openP}
            onVisibleChange={(v) => {
              setOpenP(v);
            }}
          >
            <Button onClick={() => {}} className={'ml'}>
              删除
            </Button>
          </Popover>
        </Form.Item>
      </Form>

      <SizedBox height={22} />
      <SizedBox height={22} />

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

        {model && model.intro && <BlogPreview content={model.intro} showCopy />}

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
    </Box>
  );
};
