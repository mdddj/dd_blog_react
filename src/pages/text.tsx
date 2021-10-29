import BlogAppBar from '@/components/AppBar';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Container } from '@material-ui/core';
import { useMount } from '@umijs/hooks';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'umi';
import { message } from 'antd';
import { SimpleValueModel } from '@/model/SimpleValueModel';
import { blogApi } from '@/util/request';
import { responseIsSuccess } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Card, CardContent, CircularProgress } from '@mui/material';

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
    <>
      <BlogAppBar current={'about'} />
      <Container maxWidth={'lg'} style={{ marginTop: 30 }}>
        <Card>
          <CardContent>
            {loading && <CircularProgress />}
            {simpleValue && <BlogPreview content={simpleValue.context} />}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SimpleTextView;
