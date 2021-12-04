import { blogApi } from '@/util/request';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useMount } from '@umijs/hooks';
import { message } from 'antd';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { useState } from 'react';
import { history } from '@/.umi/core/history';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';

type props = {
  href: string;
};

/// flutter链接组件。
const FlutterLink: React.FC<props> = ({ href }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [info, setInfo] = useState(undefined);

  // 组件被挂载成功
  useMount(async () => {
    fetchPlugin();
  });

  // 加载插件数据
  const fetchPlugin = async () => {
    let pluginname = getPluginName();
    let result = await blogApi().getFlutterPluginInfo(pluginname);
    successResultHandle(
      result,
      (d) => {
        console.log(d);
        setInfo(JSON.parse(d.toString()));
      },
      message.error,
    );
    setInitLoading(false);
  };

  //解析链接获取插件名字
  const getPluginName = () => {
    let index = href.lastIndexOf('/');
    let name = href.substring(index + 1, href.length);
    return name;
  };

  if (initLoading) {
    return <div>加载插件数据中。。。</div>;
  }

  return (
    <>
      {info && (
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <FlutterDashIcon /> flutter插件
            </Typography>
            <Typography variant="h5" component="div">
              {info.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              最新版本:v{info.latest.pubspec.version}
            </Typography>
            <Typography variant="body2">
              {info.latest.pubspec.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                window.open(href);
              }}
            >
              查看插件详情
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default FlutterLink;
