import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { Popover } from 'antd';
import { useState } from 'react';
import MarkdownText from './MarkdownText';
import SizedBox from './SizedBox';

/// 博客详情页面的底部操作区域。
const DetailFoot: React.FC = () => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <SizedBox height={12} />
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Button
          variant={'contained'}
          onClick={() => {
            setShow(true);
          }}
        >
          打赏
        </Button>
      </Box>

      <Dialog
        open={show}
        onClose={() => setShow(false)}
        fullScreen={fullScreen}
        maxWidth={'xl'}
      >
        <DialogTitle id="alert-dialog-title">{'打赏'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <MarkdownText findKey={'blog-ds'} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShow(false)}>关闭</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailFoot;
