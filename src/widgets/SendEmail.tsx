import { blogApi } from '@/util/request';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useMount } from '@umijs/hooks';
import { message } from 'antd';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { useState } from 'react';

/// 接受默认参数
type Props = {
  email?: string;
  title?: string;
  content?: string;
  ishtml?: boolean;
  success?: () => void;
};

/// 发送邮件的表单
const SendEmail: React.FC<Props> = (props) => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [html, setHtml] = useState(false);

  useMount(() => {
    setEmail(props.email ?? '');
    setTitle(props.title ?? '');
    setContent(props.content ?? '');
    setHtml(props.ishtml ?? false);
  });

  const submit = () => {
    blogApi()
      .sendEmail(email, title, content, html)
      .then((r) => {
        successResultHandle(
          r,
          (d) => {
            message.success(d);
            props.success && props.success();
          },
          message.error,
        );
      });
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <TextField
          label="接受者邮箱"
          value={email}
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          value={title}
          label="标题"
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          value={content}
          label="正文内容"
          variant="standard"
          onChange={(e) => setContent(e.target.value)}
          multiline
          fullWidth
          rows={5}
        />
      </Box>
      <FormGroup sx={{ m: 2 }}>
        <FormControlLabel
          control={<Switch defaultChecked={html} value={html} />}
          label="正文内容是否为html"
          onChange={(_, v) => {
            setHtml(v);
          }}
        />
      </FormGroup>
      <Button sx={{ m: 2 }} variant="contained" onClick={submit}>
        {' '}
        提交数据
      </Button>
    </>
  );
};

export default SendEmail;
