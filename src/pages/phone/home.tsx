import IndexHomeBlogList from '@/components/IndexHomeBlogList';
import { NavBar } from 'antd-mobile';
import { Route, Switch, MemoryRouter as Router } from 'react-router-dom';
import styles from './phone.less';
import PhoneNavbar from './widgets/bottom_bar';

/// 手机版本的首页。
const PhoneIndex: React.FC<{}> = () => {
  return (
    <>
      <Router initialEntries={['/home']}>
        <div className={styles.app}>
          <div className={styles.top}>
            <NavBar backArrow={false}>梁典典的博客</NavBar>
          </div>
          <div className={styles.body}>
            <Switch>
              <Route exact path="/home">
                <IndexHomeBlogList />
              </Route>
            </Switch>
          </div>
          <div className={styles.bottom}>
            <PhoneNavbar />
          </div>
        </div>
      </Router>
    </>
  );
};

export default PhoneIndex;
