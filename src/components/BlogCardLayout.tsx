import React from 'react';
import { history } from 'umi';
import styles from './components.less';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
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
      </>
    );
  }

  /// 电脑版本博客卡片
  return (
    <Card sx={{ mb: 2.5 }} variant={'outlined'}>
      <CardContent>
        {/*分类*/}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <Chip
            color="primary"
            avatar={<Avatar src={blog.category.logo} />}
            label={blog.category.name}
            size={'small'}
            variant={'outlined'}
          />
        </Typography>

        {/*  标题*/}
        <Typography variant="h5" component="div">
          {blog.title}
        </Typography>

        {/*  标签*/}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {blog.tags.map((value) => (
            <span
              key={value.id}
              style={{
                marginRight: 12,
              }}
            >
              {value.name}
            </span>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push('/post/' + blog.id)}>
          阅读全文
        </Button>
      </CardActions>
    </Card>
  );
};

const OldBlogCard: React.FC<{ blog: BlogData }> = ({ blog }) => {
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
              {/*<MyTag*/}
              {/*  title={blog.category.name}*/}
              {/*  icon={<FontAwesomeIcon icon={faFolder} />}*/}
              {/*/>*/}
              {blog.tags.map((value) => (
                <SimpleTag key={value.id} title={value.name} />
              ))}
              {/*<SimpleTag title={da} />*/}
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
