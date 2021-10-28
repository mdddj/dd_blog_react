import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import React from 'react';
import BlogCardLayout from '@/components/BlogCardLayout';
import { PagerModel } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Pagination } from '@material-ui/core';
import { Typography } from '@mui/material';

type BlogListParams = {
  /// 要显示的博客列表
  blogs: BlogData[];

  /// 分页数据
  pager: PagerModel | undefined;

  /// 页面被切换回调
  onPageChange: (page: number) => Promise<void>;
};

/// 博客列表的组件
const BlogListComponent: React.FC<BlogListParams> = ({
  blogs,
  pager,
  onPageChange,
}) => {
  console.log(pager);

  return (
    <div>
      {/*博客列表*/}
      {blogs.map((item) => (
        <BlogCardLayout key={item.id} blog={item} />
      ))}

      {/*分页操作区域*/}
      {pager && (
        <div style={{ marginTop: 20 }}>
          <Pagination
            sx={{
              mx: 'auto',
              textAlign: 'center',
            }}
            count={pager.maxPage}
            page={pager.currentPage + 1}
            defaultPage={1}
            onChange={async (event, page) => {
              if (pager?.currentPage != page - 1) {
                await onPageChange(page);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BlogListComponent;
