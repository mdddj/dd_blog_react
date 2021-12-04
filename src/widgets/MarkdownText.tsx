import { BlogPreview } from '@/components/MarkdownPreview';
import { blogApi } from '@/util/request';
import { useMount } from '@umijs/hooks';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { useState } from 'react';

const MarkdownText: React.FC<{ findKey: string }> = (props) => {
  const [markdown, setMarkdow] = useState('');

  useMount(() => {
    blogApi()
      .getTextByName(props.findKey)
      .then((v) => {
        successResultHandle(v, (d) => {
          setMarkdow(d.context);
        });
      });
  });

  if (markdown == '') {
    return <span>无内容</span>;
  }
  return <>{markdown != '' && <BlogPreview content={markdown} />}</>;
};
export default MarkdownText;
