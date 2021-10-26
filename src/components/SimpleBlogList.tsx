import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { User } from '@geist-ui/react';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';

//  博客布局,简单版本
const SimpleBlogListItem: React.FC<{ blog: BlogData }> = ({ blog }) => {
  return (
    <CardActionArea
      style={{ marginBottom: 30 }}
      component="a"
      href={'/detail?id=' + blog.id}
    >
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {blog.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <User src="/images/avatar.png" name="Witt" /> {blog.dateString}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            阅读全文
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default SimpleBlogListItem;
