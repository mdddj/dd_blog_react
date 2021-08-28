// @ts-ignore
import BlogAppBar from '@/components/AppBar';
import IndexHomeBlogList from '@/components/IndexHomeBlogList';

export default function IndexPage() {
  return (
    <>
      <BlogAppBar />
      <IndexHomeBlogList />
      <div style={{ height: 50 }} />
    </>
  );
}
