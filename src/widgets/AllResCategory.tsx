import { blogApi } from '@/util/request';
import { Button } from '@mui/material';
import { useMount, useRequest } from '@umijs/hooks';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';

type Props = {
  onSelect: (res: ResCategory) => void;
  current?: ResCategory;
};
/// 获取全局可选分类的动态
const AllResCategoryWidget: React.FC<Props> = ({ onSelect, current }) => {
  const { loading, data, error } = useRequest(() =>
    blogApi().getResourceCategoryList({ pageSize: 1000, page: 0 }),
  );

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>loading...</>;
  }

  const cates = data?.data?.list ?? [];

  return (
    <>
      {cates.map((item) => (
        <Button
          key={item.id}
          onClick={() => {
            onSelect(item);
          }}
          variant={current && current.id == item.id ? 'contained' : 'outlined'}
        >
          {item.name}
        </Button>
      ))}
    </>
  );
};

export default AllResCategoryWidget;
