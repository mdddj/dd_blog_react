import { Card, CardContent, CircularProgress, Container } from '@mui/material';
import React from 'react';
import { useLocation } from 'umi';
import BaseLayout from '@/components/BaseLayout';
import MarkdownText from '@/widgets/MarkdownText';

/**
 * 特殊文本页面
 * @returns
 */
const SimpleTextView: React.FC = () => {
  const {
    query: { name },
  } = useLocation() as any;

  return (
    <BaseLayout appbarCurrent={'about'}>
      <Container maxWidth={'lg'} style={{ marginTop: 30 }}>
        <Card>
          <CardContent>{name && <MarkdownText findKey={name} />}</CardContent>
        </Card>
      </Container>
    </BaseLayout>
  );
};

export default SimpleTextView;
