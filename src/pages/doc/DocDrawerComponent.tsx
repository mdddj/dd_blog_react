import React, { useState } from 'react';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { message } from 'antd';
import { useMount } from 'ahooks';
import { Box, CssBaseline, Drawer, Toolbar, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { TreeItem, TreeView } from '@mui/lab';
import { TreeFolders } from 'dd_server_api_web/src/model/ResourceTreeModel';

const drawerWidth = 240;

type Props = {
  id: number;
};

/// 文档的抽屉栏组件
const DocDrawerComponent: React.FC<Props> = ({ id }) => {
  // 目录树
  const [myTree, setMyTree] = useState<TreeFolders>();

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
      </TreeItem>
    );
  };

  return (
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
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            {myTree && getTreeView(myTree)}
          </TreeView>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
};

export default DocDrawerComponent;
