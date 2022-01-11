import React, { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import { BlogPreview } from '@/components/MarkdownPreview';
import { history, useLocation } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import SizedBox from '@/widgets/SizedBox';
import { MyTag } from '@/widgets/MyTag';
import { remove } from 'lodash';
import { onEditImageUpload } from '@/util/image';

Editor.use(CustomImageUpload);
Editor.use(FlutterPlugin);
Editor.use(CustomAuthTip);

/// 发布博客页面
const MarkdownPage: React.FC = () => {
  const {
    query: { id },
  } = useLocation() as any;
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectCategory, setSelectCategory] = useState<Category>();
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [settingEl, setSettingEl] = useState<HTMLElement | null>();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [pushState, setPushState] = useState(false);
  const [result, setResult] = useState<Result<any>>(DefaultResult);
  const [showCreateTagDialog, setShowCreateTagDialog] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // 新添加的标签
  const [newTags, setNewTags] = useState<string[]>([]);

  /// 组件加载成功生命周期，请求服务器获取分类和标签数据
  useMount(() => {
    // 请求服务器api
    blogApi()
      .getArchives()
      .then((r) => {
        successResultHandle<ArchiveModel>(r, (data) => {
          setTags(data.tags);
          setCategorys(data.categoryList);
          if (id) {
            blogApi()
              .getBlogDetailById(id)
              .then((r) => {
                successResultHandle<BlogData>(r, (data) => {
                  setSelectCategory(data.category);
                  setTitle(data.title);
                  setContent(data.content);
                  setSelectTags(data.tags.map((v) => v.name));
                });
              });
          }
        });
      });
  });

  /// 博文内容被更改
  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  /// 提交博客到服务器
  const submit = async () => {
    let _all_tags = selectTags.concat(newTags);

    if (
      !selectCategory ||
      _all_tags.length == 0 ||
      title.length == 0 ||
      content.length <= 20
    ) {
      return;
    }

    let data = {
      categoryId: selectCategory!.id,
      content: content,
      tags: _all_tags,
      title: title,
    } as any;
    if (id) {
      data.id = id;
    }
    /// 提交数据到服务器
    let d = await blogApi().pushNewBlog(data);
    setPushState(true);
    setResult(d);
  };

  const isOpen = Boolean(settingEl);
  const ppId = isOpen ? 'pp-id' : undefined;

  /// 判断一个标签是否被选中
  // 返回true表示已选中
  const tagIsSelect = (tagName: string): boolean => {
    return selectTags.indexOf(tagName) > -1;
  };

  return (
    <div>
      <header className={'markdown-header'}>
        <div className={'input'}>
          <TextField
            fullWidth={true}
            label={'请输入文章标题...'}
            variant={'standard'}
            value={title}
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

      {/*博客内容编写*/}
      <div className={'markdown-edit'}>
        <Editor
          style={{ height: '100%' }}
          renderHTML={(text) => <BlogPreview content={text} />}
          onChange={handleEditorChange}
          onImageUpload={onEditImageUpload}
          value={content}
        />
      </div>

      {/*底部设置区域 已废弃*/}
      {/*<div className={'push-bottom-action'}>*/}
      {/*  <div>*/}
      {/*    <span className={'text-small text-tint mr'}>选项:</span>*/}
      {/*    <Button>添加分类</Button>*/}
      {/*    <Button>添加标签</Button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*  选择分类，标签，主图，和短链的选项弹窗 */}
      <Popover
        open={isOpen}
        anchorEl={settingEl}
        id={ppId}
        sx={{ p: 2 }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={() => setSettingEl(null)}
      >
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Typography variant={'h5'}>博客设置</Typography>
        </div>
        <Stack style={{ width: 550, minHeight: 500 }}>
          <Box sx={{ p: 1 }}>
            {/*选择分类或者标签区域*/}
            <Stack
              spacing={3}
              direction={'column'}
              style={{ padding: '12px 0' }}
            >
              {/*分类flex版本*/}
              <div className={'category-flex-item'}>
                <div className={'c-title'}>
                  <span>选择分类</span>
                </div>
                <div className={'c-items'}>
                  {categorys.map((value) => (
                    <span
                      key={value.id}
                      className={
                        selectCategory && selectCategory.id == value.id
                          ? 'c-active'
                          : ''
                      }
                      onClick={() => {
                        setSelectCategory(value);
                      }}
                    >
                      {value.name}
                    </span>
                  ))}
                </div>
              </div>

              <SizedBox height={12} />

              {/*添加标签flex版本*/}
              <div className={'category-flex-item'}>
                <div className={'c-title'}>
                  <span>添加标签</span>
                </div>
                <div className={'c-items'}>
                  {/* 先遍历服务器的已存在标签列表 */}
                  {tags.map((value) => {
                    let isselect = tagIsSelect(value.name);
                    return (
                      <span
                        key={value.id}
                        className={isselect ? 'c-active' : ''}
                        onClick={() => {
                          /// 判断是否存在,如果是选中状态，需要删除
                          if (tagIsSelect(value.name)) {
                            let newarr = [...selectTags];
                            remove(newarr, function (n: string) {
                              return n == value.name;
                            });
                            setSelectTags(newarr);
                          } else {
                            /// 将标签添加到标签数组
                            let t = selectTags.concat(value.name);
                            setSelectTags(t);
                          }
                        }}
                      >
                        {value.name}
                      </span>
                    );
                  })}

                  {/* 遍历新添加的标签 */}
                  {newTags.map((value) => {
                    return (
                      <span
                        key={value}
                        className="c-active"
                        onClick={() => {
                          let _newtags = [...newTags];
                          remove(_newtags, function (n: string) {
                            return n == value;
                          });
                          setNewTags(_newtags);
                        }}
                      >
                        {value}
                      </span>
                    );
                  })}

                  <span
                    style={{ background: 'white' }}
                    onClick={() => {
                      setShowCreateTagDialog(true);
                    }}
                  >
                    {' '}
                    <MyTag
                      title="创建"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                    />
                  </span>
                </div>
              </div>
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

      {/* 创建新标签弹窗 */}
      <Dialog
        open={showCreateTagDialog}
        onClose={() => {
          setShowCreateTagDialog(false);
        }}
      >
        <DialogTitle>添加文章标签</DialogTitle>
        <DialogContent>
          <DialogContentText>
            添加的标签会在服务器中自动创建，如果已存在将会引用已存在的标签
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tagname"
            label="标签名"
            type="text"
            fullWidth
            variant="standard"
            value={newTagName}
            onChange={(e) => {
              setNewTagName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowCreateTagDialog(false);
            }}
          >
            关闭
          </Button>
          <Button
            onClick={() => {
              let _tags = [...newTags, newTagName];
              setNewTags(_tags);
              setShowCreateTagDialog(false);
              setNewTagName('');
            }}
          >
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MarkdownPage;
