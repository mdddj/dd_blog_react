import BlogAppBar from '@/components/AppBar';
import { BlogPreview } from '@/components/MarkdownPreview';
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
} from '@material-ui/core';
import { useMount } from '@umijs/hooks';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'umi';
import { message } from 'antd';
import { SimpleValueModel } from '@/model/SimpleValueModel';
import { blogApi } from '@/util/request';
import { responseIsSuccess } from 'dd_server_api_web/apis/utils/ResultUtil';
import BaseLayout from '@/components/BaseLayout';

/**
 * 特殊文本页面
 * @returns
 */
const SimpleTextView: React.FC = () => {
  const [simpleValue, setSimpleValue] = useState<SimpleValueModel>();
  const [loading, setLoading] = useState(true);

  const {
    query: { name },
  } = useLocation() as any;

  // 加载数据
  const fetchData = async () => {
    const result = await blogApi().getTextByName(name as string);
    setLoading(false);
    if (responseIsSuccess(result)) {
      setSimpleValue(result.data);
    } else {
      message.error(result.message);
    }
  };

  // 组件被挂载
  useMount(async () => {
    await fetchData();
  });

  console.log(simpleValue);

  return (
    <BaseLayout appbarCurrent={'about'}>
      <Container maxWidth={'lg'} style={{ marginTop: 30 }}>
        <Card>
          <CardContent>
            {loading && <CircularProgress />}
            {simpleValue && <BlogPreview content={simpleValue.context} />}
          </CardContent>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default SimpleTextView;
