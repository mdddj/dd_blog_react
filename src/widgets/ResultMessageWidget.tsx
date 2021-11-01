import React from 'react';
import { Result } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Alert } from '@material-ui/core';

type Props = {
  result?: Result<any>;
};

/// 通用的消息提示组件
const ResultMessageWidget: React.FC<Props> = ({ result }) => {
  if (!result || result.state == -1) {
    return <></>;
  }

  //判断请求是否处理成功
  const isSuccess = result.state == 200;
  const message = result.message;

  return (
    <div>
      {isSuccess ? (
        <Alert severity="success">{message}</Alert>
      ) : (
        <Alert severity="error">{message}</Alert>
      )}
    </div>
  );
};

export default ResultMessageWidget;
