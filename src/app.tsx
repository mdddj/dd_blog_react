import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#f6f7f9',
    },
  },
  typography: {
    fontFamily: 'LXGW WenKai',
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1,
        style: {
          boxShadow: '0 6px 8px rgba(0,0,0,.075)',
        },
      },
    },
  },
});

export function rootContainer(container: JSX.Element): JSX.Element {
  return <ThemeProvider theme={theme}>{container}</ThemeProvider>;
}
