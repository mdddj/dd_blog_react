import React from 'react';
import { Blog } from '@/model/BlogModel';
import { history } from 'umi';
import styles from './components.less';
import { Button } from '@geist-ui/react/esm';
import { Card } from '@geist-ui/react';

/**
 * 首页博客卡片布局
 * @param blog  博客数据
 * @constructor
 */
const BlogCardLayout: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <Card className={styles.blogRoot} hoverable={true}>
      <div className={styles.blogWrap}>
        <div className={styles.blogTitle}>{blog.title}</div>
        <div className={styles.blogDataString}>
          {blog.category.name} · {blog.dateString}
        </div>
        <Button
          onClick={() => {
            history.push('/detail?id=' + blog.id);
          }}
        >
          继续阅读
        </Button>
      </div>
    </Card>
  );
};

export default BlogCardLayout;
