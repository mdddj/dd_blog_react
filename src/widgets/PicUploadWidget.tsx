import { Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { useState } from 'react';

/// 参数
type Props = {
  onChange: (files: UploadFile[]) => void;
  fileList: UploadFile[];
};

/// 上传照片的小部件
const PicUploadWidget: React.FC<Props> = ({ onChange, fileList }) => {
  /// 上传图片
  const handleChange = (info: UploadChangeParam) => {
    let list = info.fileList;
    onChange(list);
  };

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>选择图片</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        multiple={true}
      >
        {fileList.length >= 9 ? null : uploadButton}
      </Upload>
    </>
  );
};

export default PicUploadWidget;
