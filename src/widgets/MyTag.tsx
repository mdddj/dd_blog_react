import React from 'react';
import '../global.css';

type Props = {
  title: string;
  icon: React.ReactNode;
};

/// 标签组件
const MyTag: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <button className={'tag'}>
      <i>{props.icon}</i>
      {props.title}
    </button>
  );
};

// 简单的标签
const SimpleTag: React.FunctionComponent<{ title: string }> = ({ title }) => {
  return <span className={'simple-tag'}>{title}</span>;
};

export { MyTag, SimpleTag };
