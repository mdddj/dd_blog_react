import React, { useState } from 'react';
import {
  Box,
  Button,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@material-ui/core';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { FlutterPluginInfo } from '@/model/FlutterPluginModel';
import { Card } from '@geist-ui/react';

type Props = {
  insertText: (val: string) => void;
};

/// 插入flutter插件的小部件
const FlutterPluginAddWidget: React.FC<Props> = ({ insertText }) => {
  const [inputValue, setInputValue] = useState('');
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [flutter, setFlutter] = useState<FlutterPluginInfo>();

  const open = Boolean(el);
  const id = open ? 'insert-flutter-plugin-id' : undefined;

  /// 搜索flutter插件
  const search = async () => {
    const result = await blogApi().getFlutterPluginInfo(inputValue);
    console.log(result);
    successResultHandle<String>(result, (data) => {
      let obj = JSON.parse(data.toString());
      let info = obj.latest as FlutterPluginInfo;
      setFlutter(info);
    });
  };

  return (
    <>
      <span onClick={(e) => setEl(e.currentTarget)} style={{ marginLeft: 12 }}>
        引入flutter插件
      </span>
      <Popover
        open={open}
        id={id}
        onClose={() => setEl(null)}
        anchorEl={el}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <Box sx={{ p: 5, width: 500 }}>
          <Stack spacing={5}>
            <TextField
              label={'输入插件名'}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <Button variant={'contained'} onClick={search}>
              搜索
            </Button>

            <Box>
              {flutter && (
                <Card shadow={true}>
                  <Typography variant={'h4'}>{flutter.pubspec.name}</Typography>
                  <p>{flutter.pubspec.description}</p>
                </Card>
              )}
            </Box>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default FlutterPluginAddWidget;
