import React, { useState } from 'react';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import { useMount } from '@umijs/hooks';
import { blogApi, getAccessToken } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Alert, Box } from '@mui/material';

/// 用户状态的检测
const UserStateTipWidget: React.FC<{
  logined?: React.ReactNode;
}> = ({ children, logined }) => {
  /// 是否正在向服务器请求用户数据中
  const [loading, setLoading] = useState(true);
  /// 已登录的用户信息
  const [user, setUser] = useState<User | null>(null);
  /// 用户是否已经登录
  // const userIsLoing = loading ? false : user != null;
  /// 用户的管理权限
  const roles = user?.roles.map((value) => value.name);

  /// 是否有管理员权限
  const hasAdminRole =
    user && roles && roles?.filter((value) => value == 'admin').length >= 1;

  /// 组件被挂载
  useMount(async () => {
    let jwtToken = getAccessToken();
    if (jwtToken != '') {
      const result = await blogApi().getUserInfo(jwtToken);
      successResultHandle<User>(result, (data) => {
        setUser(data);
      });
    }
    setLoading(false);
  });

  if (loading) {
    return <>加载用户信息中</>;
  }

  const noAuth = (
    <Box sx={{ p: 2 }}>
      {!loading && !user && !hasAdminRole && (
        <Alert severity={'warning'}>部分功能可能需要管理员的权限才能操作</Alert>
      )}
    </Box>
  );

  return (
    <>
      {!children && !hasAdminRole ? noAuth : hasAdminRole ? logined : children}
    </>
  );
};

export default UserStateTipWidget;
