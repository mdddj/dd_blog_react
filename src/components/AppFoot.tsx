import { Box, Container, Link, Typography } from '@mui/material';
import * as React from 'react';
import '../global.css';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://itbug.shop">
        梁典典的个人博客
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      className={'footer'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      style={{ marginTop: 30 }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">赣ICP备17011549号-1</Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
