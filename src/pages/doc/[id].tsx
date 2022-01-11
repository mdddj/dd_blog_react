import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import { useParams } from 'umi';
import { blogApi } from '@/util/request';
import { useRequest } from '@umijs/hooks';
import { CircularProgress } from '@mui/material';
import DocDrawerComponent from '@/pages/doc/DocDrawerComponent';

// 文档详情
const DocDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params; // 用户ID。

  if (!id) {
    return <div>404</div>;
  }

  const { data, error, loading } = useRequest(() =>
    blogApi().getResourceCategory({ id: id } as any),
  );

  let cate = data?.data;

  return (
    <BaseLayout full={true} appbarCurrent={'教程'}>
      {/* 其他组件 */}
      {loading && <CircularProgress />}

      {!loading && !cate && <div>404未找到资源</div>}

      {error && <div>加载失败:${error}</div>}

      {/* 文档显示区域 */}
      <DocDrawerComponent id={id as any} />
    </BaseLayout>
  );
};

export default DocDetail;
