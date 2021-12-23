import React from 'react';
import { history } from 'umi';
import styles from './components.less';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { CardActions, CardContent, Paper, Stack } from '@mui/material';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import { SimpleTag, MyTag } from '@/widgets/MyTag';
import MyButton from '@/widgets/MyButton';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';

/**
 * 首页博客卡片布局
 * @param blog  博客数据
 * @constructor
 */
const BlogCardLayout: React.FC<{ blog: BlogData }> = ({ blog }) => {
  let da = dayjs(blog.dateString, 'zh-cn').format('YYYY-MM-DD');

  /// 适配手机版本
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  /// 手机版本博客卡片
  if (isTabletOrMobile) {
    return (
      <>
        <p
          onClick={() => {
            history.push('/post/' + blog.id);
          }}
        >
          {blog.title}
        </p>

        {/* <Card
          title={<div>{blog.title}</div>}
          style={{ fontWeight: 'normal' }}
          onHeaderClick={() => {
            history.push('/post/' + blog.id);
          }}
        >
          <div className={styles.content} style={{ height: 50 }}>
            {blog.content.substring(0, 50)}
          </div>
        </Card> */}
      </>
    );
  }

  /// 电脑版本博客卡片
  return (
    <Paper elevation={0} className={styles.blogWrap}>
      <div className={styles.blogRoot}>
        <div className={styles.blogWrap}>
          <CardContent>
            <div className={styles.blogTitle}>{blog.title}</div>
            <div className={styles.blogDataString}>
              {/* <User
                src={'https://i.imgur.com/kbYvbMt.jpeg'}
                name="梁典典"
                style={{ marginLeft: -12 }}
              />{' '} */}
              <MyTag
                title={blog.category.name}
                icon={<FontAwesomeIcon icon={faFolder} />}
              />
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
                  history.push('/post/' + blog.id);
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
