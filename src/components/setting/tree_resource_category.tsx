import { blogApi } from '@/util/request';
import { useMount } from '@umijs/hooks';
import { message, Tree, TreeDataNode } from 'antd';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';
import { Result } from 'dd_server_api_web/apis/utils/ResultUtil';
import { successResultHandle } from 'dd_server_api_web/src/utils/ResultUtil';
import { useState } from 'react';

/// 组件参数
type props = {
  onselect?: (res: ResCategory) => void;
};

/// 节点对象
interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(
  list: DataNode[],
  key: React.Key,
  children: DataNode[],
): DataNode[] {
  return list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

/// 分类的树选择组件
const TreeResourceCategory: React.FC<props> = (props) => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [list, setList] = useState<ResCategory[]>([]);
  const [all, setAll] = useState<ResCategory[]>([]);

  /// 根据ID查询某个分类
  const findResCategoryById = (id: string): ResCategory => {
    return all.filter((v, index, arr) => `${v.id}` == id)[0];
  };
  /// 组件被挂载
  useMount(async () => {
    await fetchInitData();
  });

  ///加载初始化数据
  const fetchInitData = async () => {
    let result = await blogApi().requestT<Result<ResCategory[]>>(
      '/api/auth/res-list-level-top',
      {},
      'GET',
    );
    setTreeData(covert(result.data ?? []));
    setAll(result.data ?? []);
    setList(result.data ?? []);
  };

  ///加载子节点数据
  const fetchChildrens = async (id: number): Promise<DataNode[]> => {
    let arr: DataNode[] = [];
    let result = await blogApi().requestT<Result<ResCategory[]>>(
      '/api/blog/category/resources/children',
      { id },
      'GET',
    );
    successResultHandle(
      result,
      (d) => {
        arr = covert(d);
        let newall = Array.from(all);
        newall = newall.concat(d);
        console.log(newall);
        setAll(newall);
      },
      message.error,
    );
    return arr;
  };

  /// 数据转treeData
  const covert = (list: ResCategory[]): DataNode[] => {
    var arr: DataNode[] = [];
    for (var i = 0; i < list.length; i++) {
      let item = list[i];
      arr.push({ title: item.name, key: `${item.id}`, isLeaf: false });
    }
    return arr;
  };

  /// 展开加载数据
  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>(async (resolve) => {
      if (children) {
        resolve();
        return;
      }
      let result = await fetchChildrens(key);
      setTreeData((origin) => updateTreeData(origin, key, result));
      resolve();
    });
  };

  return (
    <>
      <Tree
        loadData={onLoadData}
        treeData={treeData}
        onSelect={(keys: any[], info) => {
          props.onselect && props.onselect(findResCategoryById(keys[0]));
        }}
      />
    </>
  );
};

export default TreeResourceCategory;
