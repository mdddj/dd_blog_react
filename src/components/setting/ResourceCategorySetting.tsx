import { blogApi } from '@/util/request';
import SizedBox from '@/widgets/SizedBox';
import { Typography } from '@mui/material';
import { useMount } from '@umijs/hooks';
import { Button, Form, Input, message } from 'antd';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import React, { useState } from 'react';
import TreeResourceCategory from './tree_resource_category';

/**
 * 资源管理
 * @returns
 */
const ResourceCategorySetting: React.FC = () => {
  const [resourceCategoryList, setResourceCategoryList] = useState<
    ResCategory[]
  >([]);
  const [initLoading, setInitLoading] = useState(true);
  const [parentNode, setParentNode] = useState<ResCategory | undefined>(
    undefined,
  );

  /// 组件启动后执行
  useMount(async () => {
    await fetchAllCategory();
    setInitLoading(false);
  });

  /// 加载全部的资源分类
  const fetchAllCategory = async () => {
    let result = await blogApi().getResourceCategoryList({
      page: 0,
      pageSize: 1000,
    });
    successResultHandle(
      result,
      (d) => {
        setResourceCategoryList(d.list);
      },
      message.error,
    );
  };

  /// 提交表单数据
  const submit = async (values: ResCategory) => {
    if (parentNode) {
      values.parentNode = parentNode;
    }
    let result = await blogApi().saveOrUpdateResourceCategory(values);
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
      {/*  提交表单 */}
      <Form layout="vertical" onFinish={submit}>
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="logo" name="logo">
          <Input />
        </Form.Item>
        <Form.Item label="介绍" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="类型" name="type">
          <Input />
        </Form.Item>

        <Typography className={'mb'}>选择父资源文件夹</Typography>

        <TreeResourceCategory
          onselect={(res) => {
            console.log(res);
            setParentNode(res);
          }}
        />
        <SizedBox height={12} />
        <Form.Item>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ResourceCategorySetting;
