import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CardFooter from '@geist-ui/react/dist/card/card-footer';

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
        {footChildren && <CardFooter>{footChildren}</CardFooter>}
      </Card>
    </div>
  );
};

export default MyCard;
