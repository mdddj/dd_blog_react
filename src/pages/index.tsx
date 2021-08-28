// @ts-ignore
import BlogAppBar from '@/components/AppBar';
import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import { ThemeProvider } from '@material-ui/core';
import { whiteTheme } from '@/config/theme';

export default function IndexPage() {
  return (
    <ThemeProvider theme={whiteTheme}>
      <BlogAppBar />
      <IndexHomeBlogList />
      <div style={{ height: 50 }} />
    </ThemeProvider>
  );
}
