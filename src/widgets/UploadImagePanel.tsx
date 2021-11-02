import {
  Alert,
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useMount } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import { ResCategory } from 'dd_server_api_web/src/model/ResCategory';
import { Card, Grid, Loading } from '@geist-ui/react';
import { Add, CloudUpload } from '@material-ui/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import SizedBox from '@/widgets/SizedBox';
import { fileOpen } from 'browser-fs-access';
import { Result } from 'dd_server_api_web/src/utils/ResultUtil';
import ResultMessageWidget from '@/widgets/ResultMessageWidget';

/// 自定义上传图片面板
const UploadImagePanel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cates, setCates] = useState<ResCategory[]>([]);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [currCate, setCurrCate] = useState<ResCategory>();
  const [file, setFile] = useState<File | null>();
  const [uploadIng, setUploading] = useState(false);
  const [result, setResult] = useState<Result<any>>();

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <span
        className={'button button-type-clear'}
        onClick={(e) => setEl(e.currentTarget)}
      >
        <CloudUpload style={{ fontSize: 16 }} />
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
            {loading && <Loading />}
            <Grid.Container gap={1} justify="flex-start">
              {cates.map((value) => (
                <Grid key={value.id}>
                  <Card
                    shadow
                    width={'100%'}
                    style={{ textAlign: 'center' }}
                    type={currCate?.id == value.id ? 'success' : undefined}
                    onClick={() => setCurrCate(value)}
                  >
                    {value.name}
                  </Card>
                </Grid>
              ))}
            </Grid.Container>

            <SizedBox height={30} />
            <Typography variant={'body1'}>选择上传的图片</Typography>
            <Card
              shadow
              style={{
                paddingTop: 100,
                paddingBottom: 100,
                textAlign: 'center',
              }}
              onClick={async () => {
                const sf = await fileOpen({
                  multiple: false,
                  mimeTypes: ['image/*'],
                });
                console.log(file);
                if (sf) {
                  setFile(sf);
                }
              }}
            >
              <div>
                <Add />
              </div>
              <div>选择图片</div>
            </Card>
            {file && <Alert security={'success'}>已选择图片</Alert>}
            <SizedBox height={30} />
            <Box>
              <Button
                variant={'contained'}
                onClick={async () => {
                  let obj = {} as any;
                  obj.folder = currCate;
                  let formData = new FormData();
                  formData.append('file', file!);
                  formData.append('info', JSON.stringify(obj));
                  setUploading(true);
                  let result = await blogApi().uploadFile(formData);
                  setUploading(false);
                  setResult(result);
                }}
              >
                上传
              </Button>
            </Box>
            <SizedBox height={12} />
            {uploadIng && <Loading />}
            <ResultMessageWidget result={result} />
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default UploadImagePanel;
