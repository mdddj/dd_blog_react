import BlogAppBar from '@/components/AppBar';
import { BlogPreview } from '@/components/MarkdownPreview';
import { responseIsSuccess } from '@/model/Result';
import { getTextByName } from '@/service/Blog';
import { Container } from '@material-ui/core';
import { useMount } from '@umijs/hooks';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'umi';
import { SimpleValueModel } from '@model/SimpleValueModel';
import { message } from 'antd';

/**
 * 特殊文本页面
 * @returns
 */
const SimpleTextView: React.FC = () => {
  const [simpleValue, setSimpleValue] = useState<SimpleValueModel>();

  const {
    query: { name },
  } = useLocation() as any;

  // 加载数据
  const fetchData = async () => {
    const result = await getTextByName(name as string);
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
      <BlogAppBar />
      <Container maxWidth={'lg'}>
        {simpleValue != undefined && (
          <BlogPreview content={simpleValue.context} />
        )}
      </Container>
    </>
  );
};

export default SimpleTextView;
