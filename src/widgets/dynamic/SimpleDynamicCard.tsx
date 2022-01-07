import { Button } from '@mui/material';
import { Image, message, Tag } from 'antd';
import { ResourceModel } from 'dd_server_api_web/apis/model/ResourceModel';
import React from 'react';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';

/// 动态卡片
const DynamicCard: React.FC<{ item: ResourceModel }> = ({ item }) => {
  if (item.type == 'simple-text') {
    return <SimpleDynamicCard dynamic={item} />;
  }
  if (item.type == 'post') {
    return <SimpleDynamicCard dynamic={item} />;
  }

  /// 如果没有用户信息，则返回一个空的
  if (!item.user) {
    return <></>;
  }
  return (
    <div>
      {item.content}
      <DeleteDynamicButton id={item.id} />
    </div>
  );
};

//简单消息的布局
const SimpleDynamicCard: React.FC<{ dynamic: ResourceModel }> = ({
  dynamic,
}) => {
  return (
    <div className={'dynamic-item-wrap'}>
      <img
        src={dynamic.user?.picture ?? 'https://i.imgur.com/kbYvbMt.jpeg'}
        alt={'头像'}
        className={'dynamic-avator'}
      />
      <div className={'dynamic-content'}>
        <strong>{dynamic.user?.nickName ?? '梁典典'}</strong>
        {/*<Tag color={"red"}> {dynamic.user?.loginNumber??''}</Tag>*/}
        <div
          style={{
            fontSize: 14,
            color: '#17181a',
            overflow: 'hidden',
            marginTop: 10,
            marginBottom: 8,
          }}
        >
          {dynamic.content}
        </div>
        {dynamic.images && dynamic.images.length > 0 && (
          <div
            style={{
              display: 'flex',
              maxWidth: '100%',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: 398,
                display: 'flex',
                maxWidth: '100%',
                flexWrap: 'wrap',
              }}
            >
              {dynamic.images.map((value) => (
                <div
                  key={value.id}
                  style={{
                    position: 'relative',
                  }}
                >
                  <Image
                    src={value.url}
                    width={'100%'}
                    style={{
                      marginRight: 4,
                      maxWidth: 110,
                      height: 110,
                      width: 110,
                      marginTop: 4,
                      flex: '0 1 auto',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 分类的显示 */}
        {dynamic.category && (
          <Tag color="#55acee"># {dynamic.category.name}</Tag>
        )}

        {/* 操作区域 */}
        <DeleteDynamicButton id={dynamic.id} />
      </div>
    </div>
  );
};
export { SimpleDynamicCard, DynamicCard };

//删除动态按钮
const DeleteDynamicButton: React.FC<{ id: number }> = ({ id }) => {
  return (
    <>
      <Button
        onClick={() => {
          blogApi()
            .deleteResource(id)
            .then((value) => {
              successResultHandle<string>(
                value,
                (data) => {
                  message.success(data).then((r) => {});
                },
                message.error,
              );
            });
        }}
      >
        删除
      </Button>
    </>
  );
};
