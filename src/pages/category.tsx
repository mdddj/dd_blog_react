import React from 'react';
import BlogAppBar from '@/components/AppBar';
import { useRequest } from '@umijs/hooks';
import { getArchives } from '@/service/Blog';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from '@material-ui/core';

import styles from './index.less';
import { Result } from '@/model/Result';
import { ArchiveModel } from '@/model/ArchiveModel';
import { Fieldset } from '@geist-ui/react';
/**
 * 分类页面
 * @constructor
 */
const CategoryPage: React.FC = () => {
  const { loading, data, error } = useRequest<Result<ArchiveModel>>(() =>
    getArchives(),
  );

  console.log(data);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const categorysView = () => {
    const categoryList = data?.data.categoryList;
    return (
      <div>
        {categoryList &&
          categoryList.map((item) => (
            <Fieldset>
              <Fieldset.Title>
                层叠样式表 (Cascading Style Sheets，缩写为 CSS）
              </Fieldset.Title>
              <Fieldset.Subtitle>
                CSS 是开放网络的核心语言之一，由 W3C 规范 实现跨浏览器的标准化。
              </Fieldset.Subtitle>
              <Fieldset.Footer>
                CSS3 分成多个小模块且正在标准化中。
                <Button>学习 CSS</Button>
              </Fieldset.Footer>
            </Fieldset>
          ))}
      </div>
    );
  };

  return (
    <>
      <BlogAppBar />

      <Container maxWidth={'lg'} className={styles.bodyCard}>
        {loading ? <CircularProgress /> : <></>}

        {error && <span>{error}</span>}

        {
          <Card>
            <CardContent>
              分类
              {categorysView()}
            </CardContent>
          </Card>
        }
      </Container>
    </>
  );
};

export default CategoryPage;
