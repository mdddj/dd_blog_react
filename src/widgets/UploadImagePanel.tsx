import {
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
import { CloudUpload } from '@material-ui/icons';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

/// 自定义上传图片面板
const UploadImagePanel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cates, setCates] = useState<ResCategory[]>([]);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [currCateId, setCurrCateId] = useState<number>(-1);

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
        <Box sx={{ p: 2, width: 420 }}>
          <Stack spacing="2" direction={'column'}>
            <Typography variant={'body1'}>选择上传到哪个文件夹</Typography>
            {loading && <Loading />}
            <Grid.Container gap={2} justify="center">
              {cates.map((value) => (
                <Grid xs key={value.id}>
                  <Card
                    shadow
                    width={'100%'}
                    style={{ textAlign: 'center' }}
                    type={currCateId == value.id ? 'success' : undefined}
                    onClick={() => setCurrCateId(value.id)}
                  >
                    {value.name}
                  </Card>
                </Grid>
              ))}
            </Grid.Container>

            <Box></Box>

            <Box>
              <Button variant={'contained'} onClick={() => {}}>
                上传
              </Button>
            </Box>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default UploadImagePanel;
