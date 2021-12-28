import BaseLayout from '@/components/BaseLayout';
import { blogApi } from '@/util/request';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useMount } from '@umijs/hooks';
import {
  PagerModel,
  responseIsSuccess,
  Result,
  successResultHandle,
} from 'dd_server_api_web/apis/utils/ResultUtil';
import { ResourceModel } from 'dd_server_api_web/apis/model/ResourceModel';
import SizedBox from '@/widgets/SizedBox';
import { DynamicCard } from '@/widgets/dynamic/SimpleDynamicCard';
import { message } from 'antd';
import PicUploadWidget from '@/widgets/PicUploadWidget';
import { UploadFile } from 'antd/lib/upload/interface';

type DynamicListResultModel = {
  page: PagerModel;
  list: ResourceModel[];
};

/// 动态的页面
const DynamicPage: React.FC = () => {
  // 正文内容
  const [content, setContent] = useState('');

  /// 动态列表
  const [dynamicList, setDynamicList] = useState<ResourceModel[]>([]);

  /// 图片列表
  const [showFileList, setShowFileList] = useState<UploadFile[]>([]);

  // 提交数据
  const onSubmit = async () => {
    if (showFileList.length == 0) {
      /// 普通文字发布模式。
      let result = await blogApi().saveOrUpdateResourcesModel({
        content: content,
        type: 'simple-text',
      } as any);
      console.log(result);
      successResultHandle(
        result,
        (d) => {
          message.success(result.message);
        },
        message.error,
      );
    } else {
      /// 发布动态模式，带图片。
    }
  };

  // 获取列表
  const fetchList = async (page: number) => {
    const result = await blogApi().requestT<Result<DynamicListResultModel>>(
      '/api/resource/list',
      {
        page: 0,
        pageSize: 10,
      },
    );
    if (responseIsSuccess<DynamicListResultModel>(result)) {
      let list = result.data?.list ?? [];
      setDynamicList(list);
    }
  };

  useMount(async () => {
    await fetchList(0);
  });

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
        <PicUploadWidget
          onChange={function (files: UploadFile<any>[]): void {
            setShowFileList(files);
          }}
          fileList={showFileList}
        />
        <Button
          sx={{ mt: 2, textAlign: 'right' }}
          variant="contained"
          onClick={onSubmit}
        >
          发布
        </Button>
      </Box>

      {/* 标题区域 */}
      <SizedBox height={20} />
      <div className={'dynamic-card'}>
        <Typography variant="h5" className={'border-bottom'}>
          动态
        </Typography>

        {/*  列表区域*/}
        <div>
          {dynamicList.map((value, index, array) => (
            <DynamicCard item={value} key={index} />
          ))}
        </div>
      </div>
      {/*  标题区域end */}
    </BaseLayout>
  );
};

export default DynamicPage;
