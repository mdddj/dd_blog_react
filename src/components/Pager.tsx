import React from "react";
import {Pagination} from "@material-ui/lab";
import {PagerModel} from "@/model/PagerModel";

/**
 * 分类组件
 * @param model PagerModel对象
 * @param onChangePage  当分页被改变时的操作
 * @constructor
 */
const Pager: React.FC<{ model: PagerModel, onChangePage?: (page: number) => void }> = ({model, onChangePage}) => {
  return <Pagination count={model.maxPage} page={model.currentPage} onChange={(event, page) => {
    if (onChangePage) {
      onChangePage(page)
    }
  }
  }/>
}

export default Pager
