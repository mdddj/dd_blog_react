// 编辑器上传图片

import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { message } from 'antd';
import { fileOpen } from 'browser-fs-access';

/**
 * 上传图片
 * @param file
 */
const onEditImageUpload = async (file: File) => {
  return new Promise<String>(async (resolve) => {
    let formData = new FormData();
    formData.append('file', file);
    let result = await blogApi().uploadFileWithSingle(formData);
    successResultHandle(
      result,
      (data) => {
        resolve(data);
      },
      (msg) => {
        message.error(msg);
      },
    );
  });
};

/**
 * 选择图片并上传到服务器
 * 返回结果为;图片URL
 */
const selectImageFile = async (): Promise<string | undefined> => {
  const blob = await fileOpen({
    mimeTypes: ['image/*'],
  });
  console.log(blob);
  if (blob) {
    let formData = new FormData();
    formData.append('file', blob);
    let result = await blogApi().uploadFileWithSingle(formData);
    let url: string | undefined;
    successResultHandle(
      result,
      (data) => {
        url = data;
      },
      message.error,
    );
    return url;
  }
  return undefined;
};

export { onEditImageUpload, selectImageFile };
