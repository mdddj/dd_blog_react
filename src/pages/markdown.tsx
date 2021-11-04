import React, { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Button, Stack, TextField } from '@mui/material';
import Editor from 'react-markdown-editor-lite';
import CustomImageUpload from '@/components/plugin/CustomImageUpload';
import CustomAuthTip from '@/components/plugin/CustomAuthTip';
import FlutterPlugin from '@/components/plugin/FlutterPlugin';

Editor.use(CustomImageUpload);
Editor.use(FlutterPlugin);
Editor.use(CustomAuthTip);

/// 发布博客页面
const MarkdownPage: React.FC = () => {
  const [content, setContent] = useState('');

  /// 博文内容被更改
  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  const imageUpLoad = (file: File): Promise<string> => {
    return new Promise((resolve) => {});
  };

  return (
    <div>
      <header className={'markdown-header'}>
        <div className={'input'}>
          <TextField
            fullWidth={true}
            label={'请输入文章标题...'}
            variant={'standard'}
            sx={{
              border: 'none',
            }}
          />
        </div>
        <div className={'actions'}>
          <Stack direction={'row'} spacing={2}>
            <Button>选项</Button>
            <Button variant={'contained'}>发布</Button>
          </Stack>
        </div>
      </header>
      <div className={'markdown-edit'}>
        <Editor
          style={{ height: '100%' }}
          renderHTML={(text) => <BlogPreview content={text} />}
          onChange={handleEditorChange}
          onImageUpload={imageUpLoad}
        />
      </div>
    </div>
  );
};

export default MarkdownPage;
