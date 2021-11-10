import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  text: String;
  icon: IconProp;
  onClick: () => void;
};

const IconSpan: React.FC<Props> = ({ onClick, icon, text }) => {
  return (
    <span onClick={onClick} className={'blog-edit-icon'}>
      <FontAwesomeIcon icon={icon} />
      {text}
    </span>
  );
};
export default IconSpan;
