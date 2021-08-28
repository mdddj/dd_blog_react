import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
} from '@material-ui/core';
import styles from '../components.less';

const BlogCardSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton>
        <Card className={styles.blogRoot}>
          <div className={styles.blogWrap}>
            <CardContent>
              <div className={styles.blogTitle} />
              <div className={styles.blogDataString}></div>
            </CardContent>

            <CardActions>
              <Button size="small">阅读全文</Button>
            </CardActions>
          </div>
        </Card>
      </Skeleton>
    </>
  );
};

export default BlogCardSkeleton;

/**
 * 博客列表加载中的骨架屏
 * @constructor
 */
export const BlogCardSkeletonList = () => {
  const list = [
    <BlogCardSkeleton />,
    <BlogCardSkeleton />,
    <BlogCardSkeleton />,
    <BlogCardSkeleton />,
  ];
  return (
    <>
      {list.map((value, index, array) => (
        <div key={index}>{value}</div>
      ))}
    </>
  );
};
