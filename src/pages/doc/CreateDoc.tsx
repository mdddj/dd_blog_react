import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { BlogPreview } from '@/components/MarkdownPreview';
import 'react-markdown-editor-lite/lib/index.css';
import Editor from 'react-markdown-editor-lite';
import CustomImageUpload from '@/components/plugin/CustomImageUpload';
import FlutterPlugin from '@/components/plugin/FlutterPlugin';
import CustomAuthTip from '@/components/plugin/CustomAuthTip';
import SizedBox from '@/widgets/SizedBox';
import { onEditImageUpload } from '@/util/image';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { message } from 'antd';

Editor.use(CustomImageUpload);
Editor.use(FlutterPlugin);
Editor.use(CustomAuthTip);

type Prop = {
  categoryId: number;
};

// 添加一篇文档
const CreateDocView: React.FC<Prop> = ({ categoryId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 提交
  const submitDoc = async () => {
    let result = await blogApi().publishPost({
      title,
      content,
      categoryId,
      type: 'doc-post',
    });
    successResultHandle(
      result,
      (_) => {
        message.success(result.message);
      },
      message.error,
    );
  };

  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  return (
    <>
      <TextField
        label="标题"
        variant="outlined"
        fullWidth={true}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <SizedBox height={12} />
      <Editor
        style={{ height: '100%' }}
        renderHTML={(text) => <BlogPreview content={text} />}
        onChange={handleEditorChange}
        onImageUpload={onEditImageUpload}
        value={content}
      />
      <Button onClick={submitDoc}>提交</Button>
      <Button
        onClick={() => {
          setTitle('');
          setContent('');
        }}
      >
        重置
      </Button>
    </>
  );
};

export default CreateDocView;
