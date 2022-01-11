// 编辑器上传图片

import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { message } from 'antd';

/**
 * 上传图片
 * @param file
 */
const onEditImageUpload = async (file: File) => {
  console.log(file);
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

export { onEditImageUpload };
