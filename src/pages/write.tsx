import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import BaseLayout from '@/components/BaseLayout';

const mdParser = new MarkdownIt(/* Markdown-it options */);

/// 发布博客页面
const WriteBlogPage: React.FC = () => {
  /// 处理变化
  function handleEditorChange(data: { html: string; text: string }) {}

  return (
    <BaseLayout>
      <MdEditor
        style={{ height: '500px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </BaseLayout>
  );
};

export default WriteBlogPage;
