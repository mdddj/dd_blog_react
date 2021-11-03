import React from 'react';
import '../global.css';

type Props = {
  text: string;
  onClick?: () => void;
};

// 我的按钮
const MyButton: React.FunctionComponent<Props> = (props) => {
  return (
    <button onClick={props.onClick} className={'my-btn'}>
      {props.text}
    </button>
  );
};

export default MyButton;
