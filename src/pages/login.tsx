import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { blogApi, saveAccessToken } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';
import { useState } from 'react';
import { history } from 'umi';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        https://itbug.shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const data = new FormData(event.currentTarget);
    let username = data.get('username') ?? '';
    let password = data.get('password') ?? '';
    if (typeof username === 'string' && typeof password === 'string') {
      blogApi()
        .login(username, password)
        .then((r) => {
          successResultHandle<string>(
            r,
            (data1) => {
              saveAccessToken(data1);
              history.push('/');
            },
            setError,
          );
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            用户登录
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error.length != 0 && (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="usernameId"
              label="用户名"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
