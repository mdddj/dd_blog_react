import React from 'react';
import { history } from 'umi';
import styles from './components.less';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { CardActions, CardContent, Paper, Stack } from '@mui/material';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import { User } from '@geist-ui/react';
import Folder from '@geist-ui/react-icons/folder';
import { SimpleTag, MyTag } from '@/widgets/MyTag';
import MyButton from '@/widgets/MyButton';

/**
 * 首页博客卡片布局
 * @param blog  博客数据
 * @constructor
 */
const BlogCardLayout: React.FC<{ blog: BlogData }> = ({ blog }) => {
  let da = dayjs(blog.dateString, 'zh-cn').format('YYYY-MM-DD');
  return (
    <Paper elevation={0} className={styles.blogWrap}>
      <div className={styles.blogRoot}>
        <div className={styles.blogWrap}>
          <CardContent>
            <div className={styles.blogTitle}>{blog.title}</div>
            <div className={styles.blogDataString}>
              <User
                src={'https://i.imgur.com/kbYvbMt.jpeg'}
                name="梁典典"
                style={{ marginLeft: -12 }}
              />{' '}
              <MyTag title={blog.category.name} icon={<Folder />} />
              {blog.tags.map((value) => (
                <SimpleTag key={value.id} title={value.name} />
              ))}
              <SimpleTag title={da} />
            </div>
          </CardContent>
          <CardActions>
            <Stack direction={'row'} spacing={2}>
              <MyButton
                onClick={() => {
                  history.push('/detail?id=' + blog.id);
                }}
                text="阅读全文"
              />
            </Stack>
          </CardActions>
        </div>
      </div>
    </Paper>
  );
};

export default BlogCardLayout;
