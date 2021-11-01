import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { history } from 'umi';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';

const MaterialBlogCard: React.FC<{ blog: BlogData }> = ({ blog }) => {
  const generSummary = (): string => {
    let content = blog.content;
    let len = 100;
    if (content.length >= len) {
      //取文章前100字作为摘要
      return content.substring(0, len);
    }
    return content;
  };

  const toDetailPage = () => {
    history.push('/detail?id=' + blog.id);
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={'https://i.imgur.com/kbYvbMt.jpeg'}
            />
          }
          title={blog.author}
          subheader={blog.dateString}
        />
        {blog.thumbnail && (
          <CardMedia
            component="img"
            height="194"
            image={blog.thumbnail}
            alt="梁典典"
          />
        )}
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {generSummary()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={toDetailPage}>
            继续阅读
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default MaterialBlogCard;
