import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { light } from '@material-ui/core/styles/createPalette';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
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
