import { ThemeProvider } from '@material-ui/styles';
import BlogAppBar from "@/components/AppBar";
import IndexHomeBlogList from "@/components/IndexHomeBlogList";
import {createTheme} from "@material-ui/core";

export default function IndexPage() {


  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#ffffff',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

  return (
    <ThemeProvider  theme={theme}>
      <BlogAppBar />
      <IndexHomeBlogList/>
    </ThemeProvider >
  );
}
