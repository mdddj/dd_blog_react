import React, { useState } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { blogApi } from '@/util/request';
import {
  PagerModel,
  successResultHandle,
} from 'dd_server_api_web/apis/utils/ResultUtil';
import { message } from 'antd';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';
import { useMount } from '@umijs/hooks';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { history } from 'umi';
import { selectImageFile } from '@/util/image';

/// 教程或者文档
const Docs: React.FC = () => {
  const [cates, setCates] = useState<ResCategory[]>([]);

  useMount(async () => {
    await fetchList();
  });

  /// 从服务器加载列表
  const fetchList = async () => {
    let result = await blogApi().getResourceCategoryList(
      { page: 0, pageSize: 12 },
      { type: 'doc' } as any,
    );
    successResultHandle<{ page: PagerModel; list: ResCategory[] }>(
      result,
      (data) => {
        setCates(data.list);
      },
      message.error,
    );
  };

  // 切换图片
  const updateImage = async (value: ResCategory) => {
    let url = await selectImageFile();
    if (url) {
      value.logo = url;
      let result = await blogApi().saveOrUpdateResourceCategory(value);
      successResultHandle(
        result,
        (_) => {
          message.success(result.message);
        },
        message.error,
      );
    }
  };

  return (
    <BaseLayout appbarCurrent={'教程'} hideRight={true}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cates.map((value) => (
          <Grid key={value.id} item xs={6}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" image={value.logo} alt={value.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {value.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    history.push('/doc/' + value.id);
                  }}
                >
                  查看教程
                </Button>
                <Button size="small">分享</Button>
                <Button
                  variant="text"
                  size={'small'}
                  onClick={() => {
                    updateImage(value);
                  }}
                >
                  更换图片
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </BaseLayout>
  );
};

export default Docs;
