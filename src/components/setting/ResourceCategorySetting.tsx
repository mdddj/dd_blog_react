import { blogApi } from '@/util/request';
import { useMount } from '@umijs/hooks';
import { Form, Input, message, Select } from 'antd';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { useState } from 'react';
const { Option } = Select;
/**
 * 资源管理
 * @returns
 */
const ResourceCategorySetting: React.FC = () => {
  const [resourceCategoryList, setResourceCategoryList] = useState<
    ResCategory[]
  >([]);
  const [initLoading, setInitLoading] = useState(true);

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
        console.log(d.list);
      },
      message.error,
    );
  };

  return <></>;
};
export default ResourceCategorySetting;
