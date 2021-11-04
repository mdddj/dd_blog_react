import React from 'react';
import { Pagination } from '@mui/material';

/**
 * 分类组件
 * @param model PagerModel对象
 * @param onChangePage  当分页被改变时的操作
 * @constructor
 */
const Pager: React.FC<{
  count: number;
  onChangePage?: (page: number) => void;
}> = ({ count, onChangePage }) => {
  return (
    <Pagination
      count={count}
      size={'large'}
      onChange={(_, p) => {
        onChangePage?.(p);
      }}
    />
  );

  // return (
  //   <Pagination
  //     count={count}
  //     onChange={(page) => {
  //       if (onChangePage) {
  //         onChangePage(page);
  //       }
  //     }}
  //   >
  //     <Pagination.Previous>
  //       <span>上一页</span>
  //     </Pagination.Previous>
  //     <Pagination.Next>
  //       <span>下一页</span>
  //     </Pagination.Next>
  //   </Pagination>
  // );
};

export default Pager;
