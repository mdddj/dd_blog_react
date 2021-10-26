import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';

/**
 * 简单卡片
 * @param title 标题
 * @param children 主内容
 * @param footChildren 底部操作区域
 * @constructor
 */
const MyCard: React.FC<{ title: string; footChildren?: React.ReactNode }> = ({
  title,
  children,
  footChildren,
}) => {
  return (
    <Paper style={{ marginTop: 30 }}>
      <Card>
        <CardContent style={{ padding: 0 }}>
          <div style={{ padding: 16 }}>
            <Typography
              variant={'h5'}
              color={'text.secondary'}
              component={'div'}
            >
              {title}
            </Typography>
          </div>
          <Divider />
          <div style={{ padding: 16 }}>{children}</div>
        </CardContent>
        {footChildren && <CardActions>{footChildren}</CardActions>}
      </Card>
    </Paper>
  );
};

export default MyCard;
