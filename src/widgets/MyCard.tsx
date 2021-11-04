import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

/**
 * 简单卡片
 * @param title 标题
 * @param tag 标题后面显示一个小tag
 * @param children 主内容
 * @param footChildren 底部操作区域
 * @constructor
 */
const MyCard: React.FC<{
  title: string;
  footChildren?: React.ReactNode;
  tag?: String;
}> = ({ title, tag, children, footChildren }) => {
  return (
    <Paper style={{ marginTop: 30 }} elevation={0}>
      <Card elevation={0}>
        <CardContent style={{ padding: 0 }}>
          <Stack spacing={2} direction={'row'} style={{ padding: 8 }}>
            <Typography
              variant={'h4'}
              color={'text.secondary'}
              component={'div'}
              style={{
                fontWeight: 700,
                fontSize: 24,
                lineHeight: 1.25,
              }}
            >
              {title}
              {tag && (
                <span
                  style={{
                    background: 'rgb(230,247,255)',
                    fontSize: 15,
                    padding: 5,
                    fontWeight: 700,
                    borderRadius: 5,
                    marginLeft: 12,
                  }}
                >
                  {tag}
                </span>
              )}
            </Typography>
          </Stack>
          <div style={{ padding: 8, paddingTop: 12, paddingBottom: 12 }}>
            {children}
          </div>
        </CardContent>
        {footChildren && <CardActions>{footChildren}</CardActions>}
      </Card>
    </Paper>
  );
};

export default MyCard;
