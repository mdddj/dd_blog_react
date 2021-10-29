import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: 'LXGW WenKai',
  },
  components: {},
});

export function rootContainer(container: JSX.Element): JSX.Element {
  return <ThemeProvider theme={theme}>{container}</ThemeProvider>;
}
