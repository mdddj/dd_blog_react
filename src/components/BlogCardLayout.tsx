import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Blog} from "@/model/BlogModel";
import {Avatar, Button, Chip, Divider, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: -1,
    background: 'white',
    borderTop: '1px solid rgb(238, 238, 238)',
    borderBottom: '1px solid rgb(238, 238, 238)',
    "&:hover": {
      boxShadow: 'rgb(0 0 0 / 4%) 0px 5px 40px'
    }
  },
  title: {
    fontSize: 18,
    color: 'rgba(0,0,0,.87)',
    fontWeight: 700
  },
  wrap: {
    padding: '0px 30px',
    margin: '0px auto'
  },
  dateString: {
    color: 'rgb(105, 105, 105)',
    marginTop: 12,
    marginBottom: 30
  }
});

/**
 * 首页博客卡片布局
 * @param blog  博客数据
 * @constructor
 */
const BlogCardLayout: React.FC<{ blog: Blog }> = ({blog}) => {
  const classes = useStyles();

  return <div className={classes.root}>
    <div className={classes.wrap}>
      <div className={classes.title}>{blog.title}</div>
      <div className={classes.dateString}>{blog.category.name} · {blog.dateString}</div>
      <Button variant="outlined">继续阅读</Button>
    </div>
  </div>
}

export default BlogCardLayout
