import React from 'react';
import { history } from 'umi';
import styles from './components.less';
import { Button, CardActions, CardContent, Paper } from '@material-ui/core';

import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import { Tag, User } from '@geist-ui/react';

// @ts-ignore
import ava from '../assets/ava.jpg';

/**
 * 首页博客卡片布局
 * @param blog  博客数据
 * @constructor
 */
const BlogCardLayout: React.FC<{ blog: BlogData }> = ({ blog }) => {
  return (
    <Paper elevation={0} className={styles.blogWrap}>
      <div className={styles.blogRoot}>
        <div className={styles.blogWrap}>
          <CardContent>
            <div className={styles.blogTitle}>{blog.title}</div>
            <div className={styles.blogDataString}>
              <User src={ava} name="梁典典" style={{ marginLeft: -12 }} />{' '}
              <Tag type="lite">{blog.category.name}</Tag> · {blog.dateString}
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
            {/*{*/}
            {/*  blog.tags.map(value => <span key={value.id}>{value.name}</span>)*/}
            {/*}*/}
          </CardActions>
        </div>
      </div>
    </Paper>
  );
};

export default BlogCardLayout;
