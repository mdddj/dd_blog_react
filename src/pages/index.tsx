import styles from './index.less';
import BlogAppBar from "@/components/AppBar";
import IndexHomeBlogList from "@/components/IndexHomeBlogList";

export default function IndexPage() {
  return (
    <div>
      <BlogAppBar />
      <IndexHomeBlogList/>
    </div>
  );
}
