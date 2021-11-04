import React from 'react';
import { Link } from '@mui/material';
import '../global.css';
import { useRequest } from '@umijs/hooks';
import { blogApi } from '@/util/request';
import {
  ArchiveModel,
  MonthsCount,
  Tag,
} from 'dd_server_api_web/apis/model/ArchiveModel';
import { Result } from 'dd_server_api_web/apis/utils/ResultUtil';
import { Category } from 'dd_server_api_web/src/model/result/BlogPushNewResultData';

/// 显示类型
export enum ArchiveShowType {
  Category, // 分类
  Archive, // 日期
  Tag, // 标签
  All, // 显示全部
}

/// 分类,归档,标签的显示组件
const ArchiveShow: React.FC<{
  title: React.ReactNode;
  type: ArchiveShowType;
  onLoad?: (datas: ArchiveModel | undefined) => void;
  onCategorySelect?: (category: Category) => void;
  onTagSelect?: (tag: Tag) => void;
  onArchiveSelect?: (month: MonthsCount) => void;
}> = ({
  title,
  type,
  onLoad,
  onCategorySelect,
  onTagSelect,
  onArchiveSelect,
}) => {
  const { loading, data, error } = useRequest<Result<ArchiveModel>>(
    () => blogApi().getArchives(),
    {
      onSuccess: (data1: Result<ArchiveModel>, _) => {
        if (onLoad) {
          onLoad(data1.data);
        }
      },
    },
  );

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>加载失败:{error}</div>;
  }

  if (data?.state !== 200) {
    return <div>加载失败:{data?.message}</div>;
  }
  const categoryList = data?.data?.categoryList ?? [];
  const dates = data?.data?.monthsCounts ?? [];
  const tags = data?.data?.tags ?? [];

  return (
    <>
      {type !== ArchiveShowType.All && <div className={'title'}>{title}</div>}
      <div>
        {type == ArchiveShowType.Category &&
          categoryList?.map((item: Category) => (
            <div
              key={item.id}
              onClick={() => {
                onCategorySelect && onCategorySelect(item);
              }}
            >
              <ArchiveItem value={item.name} />
            </div>
          ))}
        {type == ArchiveShowType.Archive &&
          dates?.map((item: MonthsCount) => (
            <div
              key={item.months}
              onClick={() => onArchiveSelect && onArchiveSelect(item)}
            >
              <ArchiveItem value={item.months + ' (' + item.count + '篇)'} />
            </div>
          ))}
        {type == ArchiveShowType.Tag &&
          tags?.map((item: Tag) => (
            <div key={item.id} onClick={() => onTagSelect && onTagSelect(item)}>
              <ArchiveItem value={item.name} />
            </div>
          ))}
      </div>
      {type == ArchiveShowType.All && (
        <div>
          <div className={'title'}>分类</div>
          {categoryList?.map((item: Category) => (
            <div
              key={item.id}
              onClick={() => {
                onCategorySelect && onCategorySelect(item);
              }}
            >
              <ArchiveItem value={item.name} />
            </div>
          ))}

          <div className={'title'}>归档</div>
          {dates?.map((item: MonthsCount) => (
            <div
              key={item.months}
              onClick={() => onArchiveSelect && onArchiveSelect(item)}
            >
              <ArchiveItem value={item.months + ' (' + item.count + '篇)'} />
            </div>
          ))}

          <div className={'title'}>标签</div>
          {tags?.map((item: Tag) => (
            <div key={item.id} onClick={() => onTagSelect && onTagSelect(item)}>
              <ArchiveItem value={item.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ArchiveShow;

/**
 * 渲染归档item布局
 * @param value 显示的文本
 * @param href 跳转url
 * @constructor
 */
const ArchiveItem: React.FC<{ value: string; href?: string }> = ({
  value,
  href,
}) => {
  return (
    <div className={'url-link'}>
      <Link href={href}>{value}</Link>
    </div>
  );
};
