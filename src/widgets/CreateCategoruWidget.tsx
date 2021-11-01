import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@material-ui/core';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Category } from 'dd_server_api_web/src/model/result/BlogPushNewResultData';
import { Loading, useToasts } from '@geist-ui/react';

/// 创建新分类的组件
const CreateCategoruWidget: React.FC = ({ children }) => {
  /// 弹窗显示的状态
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [submitIng, setSubmitIng] = useState<boolean>(false);
  const [, setToast] = useToasts();

  return (
    <Box>
      <div
        onClick={(e) => {
          console.log('显示弹窗');
          e.preventDefault();
          setShow(true);
        }}
      >
        {children}
      </div>
      {/*  创建分类的弹窗  */}
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>创建分类</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 0 }} width={500}>
            <Stack spacing={2}>
              <TextField
                id="cName"
                onChange={(event) => setName(event.target.value)}
                label="名称"
                variant="standard"
              />
              <TextField
                id="cDesc"
                onChange={(event) => setLogo(event.target.value)}
                label="Logo (url)"
                variant="standard"
              />
              <TextField
                id="cLogo"
                onChange={(event) => setDesc(event.target.value)}
                label="介绍"
                variant="standard"
                multiline={true}
                rows={4}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log('关闭弹窗');
              setShow(false);
            }}
          >
            取消
          </Button>
          {submitIng ? (
            <Loading />
          ) : (
            <Button
              onClick={async () => {
                setSubmitIng(true);
                const result = await blogApi().saveAndUpdateBlogCategory({
                  createTime: Date.parse(new Date().toDateString()),
                  id: 0,
                  intro: desc,
                  logo: logo,
                  name: name,
                });
                setSubmitIng(false);
                setToast({
                  type: result.state === 200 ? 'success' : 'error',
                  text: result.message,
                });
              }}
            >
              创建
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateCategoruWidget;
