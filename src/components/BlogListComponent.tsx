import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import React from 'react';
import BlogCardLayout from '@/components/BlogCardLayout';
import { PagerModel } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Pagination } from '@material-ui/core';

type BlogListParams = {
  /// 要显示的博客列表
  blogs: BlogData[];

  /// 分页数据
  pager: PagerModel | undefined;

  /// 页面被切换回调
  onPageChange: (page: number) => Promise<void>;

  /// 标题
  title?: string;
};

/// 博客列表的组件
const BlogListComponent: React.FC<BlogListParams> = ({
  blogs,
  pager,
  onPageChange,
  title,
}) => {
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
            count={pager.maxPage}
            page={pager.currentPage}
            defaultPage={1}
            onChange={async (event, page) => {
              if (pager?.currentPage != page) {
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
