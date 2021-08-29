import React from 'react';
import { useRequest } from '@umijs/hooks';
import { Result } from '@/model/Result';
import { ArchiveModel } from '@/model/ArchiveModel';
import { getArchives } from '@/service/Blog';
import { Link } from '@material-ui/core';

/// 显示类型
export enum ArchiveShowType {
  Category, // 分类
  Archive, // 日期
  Tag, // 标签
}

/// 分类,归档,标签的显示组件
const ArchiveShow: React.FC<{ title: string; type: ArchiveShowType }> = ({
  title,
  type,
}) => {
  const { loading, data, error } = useRequest<Result<ArchiveModel>>(() =>
    getArchives(),
  );

  if (loading) {
    return <div>加载中</div>;
  }

  if (error) {
    return <div>加载失败:{error}</div>;
  }

  if (data?.state !== 200) {
    return <div>加载失败:{data?.message}</div>;
  }
  const categoryList = data?.data.categoryList;
  const dates = data?.data.monthsCounts;
  const tags = data?.data.tags;

  return (
    <>
      <div>{title}</div>
      <div>
        {type == ArchiveShowType.Category &&
          categoryList?.map((item) => (
            <ArchiveItem value={item.name} key={item.id} />
          ))}
        {type == ArchiveShowType.Archive &&
          dates?.map((item) => (
            <ArchiveItem value={item.months} key={item.months} />
          ))}
        {type == ArchiveShowType.Tag &&
          tags?.map((item) => <ArchiveItem value={item.name} key={item.id} />)}
      </div>
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
    <div>
      <Link href={href}>{value}</Link>
    </div>
  );
};
