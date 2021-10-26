import React from 'react';
import { Link } from '@material-ui/core';
import styles from '../widgets/widget.less';
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
  title: string;
  type: ArchiveShowType;
  onLoad?: (datas: ArchiveModel | undefined) => void;
}> = ({ title, type, onLoad }) => {
  const { loading, data, error } = useRequest<Result<ArchiveModel>>(
    () => blogApi().getArchives(),
    {
      onSuccess: (data1: Result<ArchiveModel>, params) => {
        if (onLoad) {
          onLoad(data1.data);
        }
      },
    },
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
  const categoryList = data?.data?.categoryList ?? [];
  const dates = data?.data?.monthsCounts ?? [];
  const tags = data?.data?.tags ?? [];

  return (
    <>
      {type !== ArchiveShowType.All && (
        <div className={styles.title}>{title}</div>
      )}
      <div>
        {type == ArchiveShowType.Category &&
          categoryList?.map((item: Category) => (
            <ArchiveItem value={item.name} key={item.id} />
          ))}
        {type == ArchiveShowType.Archive &&
          dates?.map((item: MonthsCount) => (
            <ArchiveItem
              value={item.months + ' (' + item.count + '篇)'}
              key={item.months}
            />
          ))}
        {type == ArchiveShowType.Tag &&
          tags?.map((item: Tag) => (
            <ArchiveItem value={item.name} key={item.id} />
          ))}
      </div>
      {type == ArchiveShowType.All && (
        <div>
          <div className={styles.title}>分类</div>
          {categoryList?.map((item: Category) => (
            <ArchiveItem value={item.name} key={item.id} />
          ))}

          <div className={styles.title}>归档</div>
          {dates?.map((item: MonthsCount) => (
            <ArchiveItem
              value={item.months + ' (' + item.count + '篇)'}
              key={item.months}
            />
          ))}

          <div className={styles.title}>标签</div>
          {tags?.map((item: Tag) => (
            <ArchiveItem value={item.name} key={item.id} />
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
    <div className={styles.urlLink}>
      <Link href={href}>{value}</Link>
    </div>
  );
};
