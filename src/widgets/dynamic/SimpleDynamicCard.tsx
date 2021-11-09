import { ResourceModel } from 'dd_server_api_web/apis/model/ResourceModel';
import React from 'react';

const DynamicCard: React.FC<{}> = () => {
  return <div></div>;
};

//简单消息的布局
const SimpleDynamicCard: React.FC<{ dynamic: ResourceModel }> = ({
  dynamic,
}) => {
  return (
    <div>
      <p className="">
        <strong className="">${dynamic.user?.nickName}</strong>
        {dynamic.content}
      </p>
    </div>
  );
};
export default { SimpleDynamicCard, DynamicCard };
