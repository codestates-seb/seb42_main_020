import SectionStyle from '../../Style/SectionStyle';
import PostTopic from './PostTopic';
import Category from './Category';
import PostSearch from './PostSearch';

function Section({ path }) {
  const pathFiltered = path.slice(path.indexOf('/home'));
  let topicName = '';

  switch (pathFiltered) {
    case '/home':
      topicName = '전체';
      break;
    case '/home/question':
      topicName = '질문';
      break;
    case '/home/review':
      topicName = '리뷰';
      break;
    // case '/home/location':
    //   topicName = '지역';
    // case '/home/subject':
    //   topicName = '과목';
  }

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SectionStyle>
        <PostTopic topicName={topicName} />
        <Category path={pathFiltered} />
        <PostSearch path={pathFiltered} />
      </SectionStyle>
    </section>
  );
}

export default Section;
