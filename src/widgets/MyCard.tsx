import React from 'react';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';

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
    <div style={{ marginTop: 30 }}>
      <Card>
        <CardContent>
          <Typography variant={'h5'}>{title}</Typography>
          {children}
        </CardContent>
        {footChildren && <CardActions>{footChildren}</CardActions>}
      </Card>
    </div>
  );
};

export default MyCard;
