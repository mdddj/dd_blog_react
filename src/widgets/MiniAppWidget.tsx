import MarkdownText from './MarkdownText';
import MyCard from './MyCard';

/// 首页app层面的推广
const MiniAppWidget: React.FC = () => {
  return (
    <>
      <MyCard title={'小程序'} tag="App">
        <MarkdownText findKey={'home-mini-app'} />
      </MyCard>
    </>
  );
};

export default MiniAppWidget;
