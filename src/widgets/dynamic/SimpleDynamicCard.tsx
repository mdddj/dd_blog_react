import { ResourceModel } from 'dd_server_api_web/apis/model/ResourceModel';
import React from 'react';

const DynamicCard: React.FC<{ item: ResourceModel }> = ({ item }) => {
  if (item.type == 'simple-text') {
    return <SimpleDynamicCard dynamic={item} />;
  }
  return <div>{item.content}</div>;
};

//简单消息的布局
const SimpleDynamicCard: React.FC<{ dynamic: ResourceModel }> = ({
  dynamic,
}) => {
  return (
    <div className={'dynamic-item-wrap'}>
      <img
        src={dynamic.user?.picture}
        alt={'头像'}
        className={'dynamic-avator'}
      />
      <p className={'dynamic-content'}>
        <strong>{dynamic.user?.nickName}</strong>
        {dynamic.content}
      </p>
    </div>
  );
};
export { SimpleDynamicCard, DynamicCard };
