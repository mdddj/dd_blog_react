import React from 'react';
import { history } from 'umi';
import styles from './components.less';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import { BlogData } from 'dd_server_api/apis/model/result/BlogPushNewResultData';

/**
 * 首页博客卡片布局
 * @param blog  博客数据
 * @constructor
 */
const BlogCardLayout: React.FC<{ blog: BlogData }> = ({ blog }) => {
  return (
    <Card className={styles.blogRoot}>
      <div className={styles.blogWrap}>
        <CardContent>
          <div className={styles.blogTitle}>{blog.title}</div>
          <div className={styles.blogDataString}>
            {blog.category.name} · {blog.dateString}
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              history.push('/detail?id=' + blog.id);
            }}
          >
            阅读全文
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default BlogCardLayout;
