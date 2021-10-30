import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import BaseLayout from '@/components/BaseLayout';
import { BlogPreview } from '@/components/MarkdownPreview';
import { Autocomplete, Box, Button, Stack, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Category } from 'dd_server_api_web/src/model/result/BlogPushNewResultData';
import { ArchiveModel, Tag } from 'dd_server_api_web/apis/model/ArchiveModel';
import { useMount } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import text from '@/pages/text';

/// 发布博客页面
const WriteBlogPage: React.FC = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectCategory, setSelectCategory] = useState<Category>();
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState('');

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

  /// 处理变化
  function handleEditorChange(data: { html: string; text: string }) {
    setContent(data.text);
  }

  /// 提交博客到服务器
  const submit = async () => {
    if (!selectCategory || tags.length == 0) {
      return;
    }
    let result = await blogApi().pushNewBlog({
      categoryId: selectCategory!.id,
      content: content,
      tags: selectTags,
      title: title,
    });
    successResultHandle(result, (data) => {
      console.log(data);
    });
  };

  return (
    <BaseLayout full={true}>
      {/*标题输入区域*/}
      <TextField
        id="standard-basic"
        label="文章标题"
        variant="standard"
        fullWidth={true}
        onChange={(event) => {
          console.log(event.target.value);
          setTitle(event.target.value);
        }}
      />

      {/*选择分类或者标签区域*/}
      <Stack spacing={3} direction={'row'} style={{ padding: '12px 0' }}>
        {/*分类*/}
        <Autocomplete<Category>
          disablePortal
          id="combo-box-demo"
          options={categorys}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={option.logo}
                srcSet={option.logo}
                alt=""
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="文章分类" />
          )}
          onChange={(e, v, _, __) => {
            setSelectCategory(v as Category);
          }}
        />
        {/*标签*/}
        <Autocomplete<Tag>
          id="tags-standard"
          options={tags}
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
            let tagNames = (v as unknown as Tag[]).map((value) => value.name);
            setSelectTags(tagNames);
          }}
        />
      </Stack>
      {/*正文编辑区域*/}
      <MdEditor
        style={{ height: '800px' }}
        renderHTML={(text) => <BlogPreview content={text} />}
        onChange={handleEditorChange}
      />
      <Button
        onClick={() => {
          submit();
        }}
      >
        提交
      </Button>
    </BaseLayout>
  );
};

export default WriteBlogPage;
