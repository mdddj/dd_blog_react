import ReactMarkdown from 'react-markdown';
import React from 'react';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useClippy from 'use-clippy';
import 'github-markdown-css/github-markdown.css';
import '../markdown.css';

/**
 * 博客预览组件
 * @param content 预览的内容 markdown 文本
 * @constructor
 */
export const BlogPreview: React.FC<{ content: string; showCopy?: boolean }> = ({
  content,
  showCopy,
}) => {
  const [_, setClipboard] = useClippy();
  return (
    <>
      {showCopy && (
        <a
          onClick={() => {
            setClipboard(content);
          }}
        >
          copy
        </a>
      )}
      <ReactMarkdown
        className={'markdown-body'}
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              // @ts-ignore
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={vs}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  border: 'none',
                  fontSize: 15,
                  backgroundColor: 'rgba(27,31,35,.05)',
                  fontFamily: 'Fira Code',
                  lineHeight: 1.5,
                }}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
};
