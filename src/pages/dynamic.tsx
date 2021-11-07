import BaseLayout from '@/components/BaseLayout';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

/// 动态的页面
const DynamicPage: React.FC = () => {
  // 正文内容
  const [content, setContent] = useState('');

  // 提交数据
  const onSubmit = () => {};

  return (
    <BaseLayout appbarCurrent="动态">
      {/* 编写发布区域 */}
      <Box>
        <TextField
          label="说点什么吧"
          placeholder="说点什么吧"
          multiline
          variant="standard"
          fullWidth
          maxRows={4}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <Button
          sx={{ mt: 2, textAlign: 'right' }}
          variant="contained"
          onClick={onSubmit}
        >
          发布
        </Button>
      </Box>
    </BaseLayout>
  );
};

export default DynamicPage;
