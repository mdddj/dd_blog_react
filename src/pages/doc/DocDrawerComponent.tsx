import React, { useState } from 'react';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { Drawer as AntdDrawer, message } from 'antd';
import { useMount } from 'ahooks';
import { Box, Button, CssBaseline, Drawer, Toolbar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { TreeItem, TreeView } from '@mui/lab';
import { TreeFolders } from 'dd_server_api_web/src/model/ResourceTreeModel';
import CreateDoc from '@/pages/doc/CreateDoc';

const drawerWidth = 240;

type Props = {
  id: number;
};

/// 文档的抽屉栏组件
const DocDrawerComponent: React.FC<Props> = ({ id }) => {
  // 目录树
  const [myTree, setMyTree] = useState<TreeFolders>();
  const [showCreateDocView, setShowCreateDocView] = useState(false);

  //启动执行
  useMount(async () => {
    await fetchMenus();
  });

  //加载数据
  const fetchMenus = async () => {
    console.log('进来了');
    let result = await blogApi().getResourceSubObject(id);
    successResultHandle(
      result,
      (data) => {
        console.log(data);
        setMyTree(data?.folders);
      },
      message.error,
    );
  };

  // 目录树
  const getTreeView = (model: TreeFolders) => {
    console.log(model.children);

    return (
      <TreeItem
        nodeId={`${model.id}`}
        label={`${model.title}`}
        key={model.id}
        expandIcon={<FolderIcon />}
        collapseIcon={<FolderOpenIcon />}
      >
        {(model.children?.length ?? 0) > 0 &&
          model.children?.map((value) => getTreeView(value))}
        {/*文章*/}
        {model.resources.length > 0 &&
          model.resources.map((value) => {
            return <TreeItem nodeId={`${value.id}`} label={value.title} />;
          })}
        {}
      </TreeItem>
    );
  };

  // 创建新的文章
  const createNew = () => {
    setShowCreateDocView(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <TreeView
              aria-label="file system navigator"
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: 'auto',
              }}
            >
              {myTree && getTreeView(myTree)}
            </TreeView>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/*操作区域*/}
          <Button variant="contained" onClick={createNew}>
            创建新的
          </Button>
        </Box>
      </Box>
      {/* 编写文档的弹窗 */}
      <AntdDrawer
        visible={showCreateDocView}
        onClose={() => setShowCreateDocView(false)}
        title={'创建文档'}
        placement={'right'}
        width={1000}
      >
        <CreateDoc />
      </AntdDrawer>
    </>
  );
};

export default DocDrawerComponent;
