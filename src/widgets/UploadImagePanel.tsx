import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Popover,
  Stack,
  Typography,
} from '@mui/material';

import React, { useState } from 'react';
import { useMount } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import { ResCategory } from 'dd_server_api_web/src/model/ResCategory';
import SizedBox from '@/widgets/SizedBox';
import { fileOpen } from 'browser-fs-access';
import { Result } from 'dd_server_api_web/src/utils/ResultUtil';
import ResultMessageWidget from '@/widgets/ResultMessageWidget';
import { FileInfo } from 'dd_server_api_web/apis/model/FileInfo';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';

/// 自定义上传图片面板
const UploadImagePanel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cates, setCates] = useState<ResCategory[]>([]);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [currCate, setCurrCate] = useState<ResCategory>();
  const [file, setFile] = useState<File | null>();
  const [uploadIng, setUploading] = useState(false);
  const [result, setResult] = useState<Result<FileInfo>>();
  const [errorMsg, setErrorMsg] = useState('');
  const [dialogState, setDialogState] = useState(false);

  const open = Boolean(el);
  const id = open ? 'image-panel' : undefined;

  useMount(async () => {
    await fetchCategorys();
  });

  const fetchCategorys = async () => {
    const result = await blogApi().getResourceCategoryList({
      page: 0,
      pageSize: 1000,
    });
    setCates(result.data?.list ?? []);
    setLoading(false);
  };

  // 上传图片操作
  const uploadSubmit = async () => {
    if (!currCate) {
      setErrorMsg('请选择上传图片到哪个文件夹');
      return;
    }
    if (file == null) {
      setErrorMsg('请选择上传的图片');
      return;
    }
    const obj = {} as any;
    obj.folder = currCate;
    let formData = new FormData();
    formData.append('file', file!);
    formData.append('info', JSON.stringify(obj));
    setUploading(true);
    let result = await blogApi().uploadFile(formData);
    setUploading(false);
    setResult(result);
    successResultHandle<FileInfo>(result, (data) => {
      setDialogState(true);
      setEl(null);
    });
  };

  // 重置操作
  const reSet = () => {
    setFile(null);
    setCurrCate(undefined);
    setResult(undefined);
    setErrorMsg('');
  };

  return (
    <>
      <span
        className={'button button-type-clear'}
        onClick={(e) => setEl(e.currentTarget)}
      >
        <span>上传</span>
      </span>

      <Popover
        open={open}
        id={id}
        anchorEl={el}
        onClose={() => setEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }} variant={'h6'}>
          上传图片
        </Typography>
        <Divider />
        <Box sx={{ p: 4, width: 520 }}>
          <Stack spacing="5" direction={'column'}>
            <Typography variant={'body1'}>选择上传到哪个文件夹</Typography>
            {loading && <span>加载中</span>}
            <Grid>
              {cates.map((value) => (
                <Grid key={value.id}>
                  <Card
                    style={{ textAlign: 'center' }}
                    onClick={() => {
                      setCurrCate(value);
                      setErrorMsg('');
                    }}
                  >
                    {value.name}
                  </Card>
                </Grid>
              ))}
            </Grid>

            <SizedBox height={30} />
            <Typography variant={'body1'}>选择上传的图片</Typography>
            <Card
              style={{
                paddingTop: 50,
                paddingBottom: 50,
                textAlign: 'center',
              }}
              onClick={async () => {
                // 如果只能选择图片 ['image/*']
                const sf = await fileOpen({
                  multiple: false,
                  mimeTypes: [],
                });
                if (sf) {
                  setFile(sf);
                  setErrorMsg('');
                }
              }}
            >
              <div>
                <span>点我选择文件</span>
              </div>
              <div>选择图片</div>
            </Card>
            {file && (
              <Alert style={{ marginTop: 20 }} security={'success'}>
                已选择图片
              </Alert>
            )}
            {errorMsg != '' && (
              <div style={{ marginTop: 20, color: 'red' }}>{errorMsg}</div>
            )}

            <SizedBox height={12} />
            {uploadIng && <span>处理中</span>}
            <ResultMessageWidget result={result} />

            {result && (
              <div style={{ marginTop: 12, color: 'green' }}>
                {result.data?.url}
              </div>
            )}

            <SizedBox height={30} />
            <Stack direction={'row'}>
              <Button variant={'contained'} onClick={uploadSubmit}>
                上传
              </Button>
              <Button onClick={reSet}>重置</Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>

      {/*  上传成功的弹窗 */}
      <Dialog
        open={dialogState}
        onClose={() => setDialogState(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'上传成功'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            URL直链: {result?.data?.url}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogState(false)}>关闭</Button>
          <Button
            onClick={() => {
              //TODO 复制并关闭
              // copy(result?.data?.url ?? '');
              setDialogState(false);
            }}
            autoFocus
          >
            复制并关闭
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadImagePanel;
