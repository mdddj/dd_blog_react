import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Blog} from "@/model/BlogModel";
import {Avatar, Chip} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * 首页博客卡片布局
 * @param blog  博客数据
 * @constructor
 */
const BlogCardLayout: React.FC<{ blog: Blog }> = ({blog}) => {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  return <Card className={classes.root}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {blog.dateString}
      </Typography>
      <Typography variant="h5" component="h2">
        {blog.title}
      </Typography>
      <Chip
        avatar={<Avatar src={blog.category.logo}/>}
        label={blog.category.name}
        onClick={()=>{}}
        variant="outlined"
      />
    </CardContent>
    <CardActions>
      <Button size="small">继续阅读</Button>
    </CardActions>
  </Card>
}

export default BlogCardLayout
