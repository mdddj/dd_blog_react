// @ts-ignore
import BlogAppBar from '@/components/AppBar';
import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import ArchiveWidget from '@/widgets/ArchiveWidget';
import HomeAbout from '@/widgets/HomeAbout';
import { Container, Grid } from '@material-ui/core';

export default function IndexPage() {
  return (
    <>
      <BlogAppBar current="index" />
      <Container style={{ marginTop: 30 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <IndexHomeBlogList />
            <div style={{ height: 50 }} />
          </Grid>
          <Grid item xs={4}>
            <HomeAbout />
            <ArchiveWidget />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
