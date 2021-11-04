import React, { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import { BlogPreview } from '@/components/MarkdownPreview';
import { history } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Editor from 'react-markdown-editor-lite';
import CustomImageUpload from '@/components/plugin/CustomImageUpload';
import CustomAuthTip from '@/components/plugin/CustomAuthTip';
import FlutterPlugin from '@/components/plugin/FlutterPlugin';
import { Category } from 'dd_server_api_web/src/model/result/BlogPushNewResultData';
import { ArchiveModel, Tag } from 'dd_server_api_web/apis/model/ArchiveModel';
import { useMount } from '@umijs/hooks';
import { blogApi, DefaultResult } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import ResultMessageWidget from '@/widgets/ResultMessageWidget';
import { Result } from 'dd_server_api_web/src/utils/ResultUtil';

const filter = createFilterOptions<Category>();
Editor.use(CustomImageUpload);
Editor.use(FlutterPlugin);
Editor.use(CustomAuthTip);

/// 发布博客页面
const MarkdownPage: React.FC = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectCategory, setSelectCategory] = useState<Category>();
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [settingEl, setSettingEl] = useState<HTMLElement | null>();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [pushState, setPushState] = useState(false);
  const [result, setResult] = useState<Result<any>>(DefaultResult);

  /// 组件加载成功生命周期，请求服务器获取分类和标签数据
  useMount(() => {
    // 请求服务器api
    blogApi()
      .getArchives()
      .then((r) => {
        successResultHandle<ArchiveModel>(r, (data) => {
          setTags(data.tags);
          setCategorys(data.categoryList);
        });
      });
  });

  /// 博文内容被更改
  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  /// 提交博客到服务器
  const submit = async () => {
    if (
      !selectCategory ||
      tags.length == 0 ||
      title.length == 0 ||
      content.length <= 20
    ) {
      return;
    }
    /// 提交数据到服务器
    let d = await blogApi().pushNewBlog({
      categoryId: selectCategory!.id,
      content: content,
      tags: selectTags,
      title: title,
    });
    setPushState(true);
    setResult(d);
  };

  const isOpen = Boolean(settingEl);
  const ppId = isOpen ? 'pp-id' : undefined;

  return (
    <div>
      <header className={'markdown-header'}>
        <div className={'input'}>
          <TextField
            fullWidth={true}
            label={'请输入文章标题...'}
            variant={'standard'}
            sx={{
              border: 'none',
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={'actions'}>
          <Stack direction={'row'} spacing={2}>
            <Button
              onClick={(e) => {
                setSettingEl(e.currentTarget);
              }}
            >
              选项
            </Button>
            <Button variant={'contained'} onClick={submit}>
              发布
            </Button>
            <IconButton onClick={history.goBack}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </Stack>
        </div>
      </header>
      <div className={'markdown-edit'}>
        <Editor
          style={{ height: '100%' }}
          renderHTML={(text) => <BlogPreview content={text} />}
          onChange={handleEditorChange}
        />
      </div>

      {/*  选择分类，标签，主图，和短链的选项弹窗 */}
      <Popover
        open={isOpen}
        anchorEl={settingEl}
        id={ppId}
        sx={{ p: 2 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={() => setSettingEl(null)}
      >
        <Stack style={{ width: 500, minHeight: 500 }}>
          <Box sx={{ p: 2 }}>
            {/*选择分类或者标签区域*/}
            <Stack
              spacing={3}
              direction={'column'}
              style={{ padding: '12px 0' }}
            >
              {/*分类*/}
              <Autocomplete<Category>
                disablePortal
                fullWidth={true}
                options={categorys}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    key={option.id}
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <Stack direction={'row'} spacing={2}>
                      <span>
                        {option.logo && option.logo != '' ? (
                          <Avatar
                            src={option.logo}
                            sx={{ width: 30, height: 30 }}
                          />
                        ) : (
                          <Avatar sx={{ width: 30, height: 30, fontSize: 13 }}>
                            {option.name[0]}
                          </Avatar>
                        )}
                      </span>
                      <Typography>{option.name}</Typography>
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="文章分类" />
                )}
                onChange={(e, v, _, __) => {
                  setSelectCategory(v as Category);
                }}
                filterOptions={(options, params) => {
                  /// 如果没有一个分类的时候，通过接口创建一个新的分类
                  const filted = filter(options, params);
                  if (params.inputValue != '') {
                    filted.push({
                      createTime: Date.parse(new Date().toDateString()),
                      id: -1,
                      intro: '',
                      logo: '',
                      name: `${params.inputValue}`,
                    });
                  }
                  return filted;
                }}
              />
              {/*标签*/}
              <Autocomplete<Tag>
                options={tags}
                // @ts-ignore
                multiple
                fullWidth={true}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="添加文章标签"
                    placeholder="标签"
                  />
                )}
                onChange={(e, v, _, __) => {
                  let tagNames = (v as unknown as Tag[]).map(
                    (value) => value.name,
                  );
                  setSelectTags(tagNames);
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Popover>

      {/*   发布状态弹窗 */}
      <Dialog open={pushState} onClose={() => setPushState(false)}>
        <DialogTitle>{'发布请求已提交到服务器'}</DialogTitle>
        <DialogContent>
          <ResultMessageWidget result={result} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPushState(false)}>我知道了</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MarkdownPage;
