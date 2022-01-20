import React, { useState } from 'react';
import { blogApi } from '@/util/request';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { Drawer as AntdDrawer, message } from 'antd';
import { useMount } from 'ahooks';
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  TextField,
  Toolbar,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import { TreeItem, TreeView } from '@mui/lab';
import { TreeFolders } from 'dd_server_api_web/src/model/ResourceTreeModel';
import CreateDoc from '@/pages/doc/CreateDoc';
import { ResourceModel } from 'dd_server_api_web/apis/model/ResourceModel';
import { BlogPreview } from '@/components/MarkdownPreview';

const drawerWidth = 240;

type Props = {
  id: number;
};

/// 文档的抽屉栏组件
const DocDrawerComponent: React.FC<Props> = ({ id }) => {
  // 目录树
  const [myTree, setMyTree] = useState<TreeFolders>();
  const [showCreateDocView, setShowCreateDocView] = useState(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(); // 当前选择的目录
  const [showResource, setShowResource] = useState<ResourceModel | undefined>(
    undefined,
  );
  const [showNodes, setShowNodes] = useState<string[]>([]); // 初始化显示的节点
  const [openCreateNewDirDialog, setOpenCreateNewDirDialog] = useState(false); //显示创建新目录的弹窗
  const [inputDirName, setInputDirName] = useState(''); // 用户输入的新目录名字

  //启动执行
  useMount(async () => {
    await fetchMenus();
  });

  //加载数据
  const fetchMenus = async () => {
    let result = await blogApi().getResourceSubObject(id);
    successResultHandle(
      result,
      (data) => {
        setMyTree(data?.folders);
        let arrs = getAllDirect(data?.folders, []);
        let ids = arrs.map((value) => `${value.id}`);
        setShowNodes(ids);
      },
      message.error,
    );
  };

  // 目录树
  const getTreeView = (model: TreeFolders) => {
    return (
      <TreeItem
        nodeId={`${model.id}`}
        label={`${model.title}`}
        key={model.id}
        expandIcon={<FolderIcon />}
        collapseIcon={<FolderOpenIcon />}
      >
        {/*文章*/}
        {model.resources.length > 0 &&
          model.resources.map((value) => {
            return (
              <TreeItem
                key={value.id}
                nodeId={`${value.id}`}
                label={value.title}
                icon={<ArticleIcon />}
              />
            );
          })}

        {/*目录*/}
        {(model.children?.length ?? 0) > 0 &&
          model.children?.map((value) => getTreeView(value))}
      </TreeItem>
    );
  };

  // 创建新的文章
  const createNew = () => {
    setShowCreateDocView(true);
  };

  // 判断节点是否为文章
  const isPost = (tree: TreeFolders, id: string): ResourceModel | undefined => {
    let res = tree.resources;
    if (res.length > 0) {
      let filterd = res.filter((value) => `${value.id}` == id);
      if (filterd.length > 0) {
        return filterd[0];
      }
    }

    if (tree.children && tree.hasChildren) {
      for (let i = 0; i < tree.children.length; i++) {
        let item = tree.children[i];
        let d = isPost(item, id);
        if (d) {
          return d;
        }
      }
    }
    return undefined;
  };

  // 展开全部文章
  const getAllDirect = (
    tree: TreeFolders,
    arr: TreeFolders[],
  ): TreeFolders[] => {
    arr = arr.concat(tree);

    if (tree.children) {
      for (let i = 0; i < tree.children.length; i++) {
        let item = tree.children[i];
        arr = arr.concat(item);
        if (item.hasChildren) {
          return getAllDirect(item, arr);
        }
      }
    }
    return arr;
  };

  //创建新的目录
  const createNewDirectory = () => {
    setOpenCreateNewDirDialog(true);
  };

  // 提交创建新的目录
  const submitNewDir = async () => {
    if (inputDirName.length === 0) {
      message.error('请输入名称');
      return;
    }
    let result = await blogApi().createOrUpdateDocDirectory({
      name: inputDirName,
      parentNodeId: categoryId,
    });
    successResultHandle(
      result,
      (data) => {
        console.log(data);
        setOpenCreateNewDirDialog(false);
        message.success(result.message);
      },
      message.error,
    );
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
                flexGrow: 1,
                maxWidth: 400,
                overflowY: 'auto',
              }}
              onNodeSelect={(_: any, nodeIds: string | string[]) => {
                if (typeof nodeIds == 'string' && myTree) {
                  let res = isPost(myTree, nodeIds);
                  if (!res) {
                    setCategoryId(parseInt(nodeIds));
                    setShowResource(undefined);
                  } else {
                    setCategoryId(undefined);
                    setShowResource(res);
                  }
                }
              }}
              expanded={showNodes}
            >
              {myTree && getTreeView(myTree)}
            </TreeView>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/*操作区域*/}
          {categoryId && (
            <Button
              variant="contained"
              onClick={createNew}
              disabled={!categoryId}
            >
              创建新的
            </Button>
          )}
          {categoryId && (
            <Button
              variant="contained"
              onClick={createNewDirectory}
              disabled={!categoryId}
            >
              创建目录
            </Button>
          )}

          {showResource && <BlogPreview content={showResource.content} />}
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
        <CreateDoc categoryId={categoryId!!} />
      </AntdDrawer>

      {/*  创建新目录的弹窗 */}
      <Dialog
        open={openCreateNewDirDialog}
        onClose={() => setOpenCreateNewDirDialog(false)}
        maxWidth={'sm'}
        fullWidth={true}
      >
        <DialogTitle>创建新的目录</DialogTitle>
        <DialogContent>
          <DialogContentText>在该目录下创建一个新的子目录.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="请输入子目录的名称"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setInputDirName(event.target.value)}
            value={inputDirName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateNewDirDialog(false)}>关闭</Button>
          <Button onClick={submitNewDir}>创建</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DocDrawerComponent;
