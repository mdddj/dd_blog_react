import React, { useState } from 'react';
import { Box, Button, Popover, Stack, TextField } from '@material-ui/core';
import request from 'umi-request';

/// pub 搜索接口，后面加上插件名字就行
let PUBL_API_URL = 'https://pub.dartlang.org/api/packages/';

/// 插入flutter插件的小部件
const FlutterPluginAddWidget: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [el, setEl] = useState<HTMLElement | null>(null);

  const open = Boolean(el);
  const id = open ? 'insert-flutter-plugin-id' : undefined;

  /// 搜索flutter插件
  const search = async () => {
    let response = await request.get(PUBL_API_URL + inputValue, {});
    console.log(response);
  };

  return (
    <>
      <span onClick={(e) => setEl(e.currentTarget)}>引入flutter插件</span>
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
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default FlutterPluginAddWidget;
