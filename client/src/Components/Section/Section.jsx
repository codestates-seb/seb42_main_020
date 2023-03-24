import SectionStyle from '../../Style/SectionStyle';
import PostTopic from './PostTopic';
import Category from './Category';
import PostSearch from './PostSearch';

function Section({ path }) {
  console.log(path);

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SectionStyle>
        <PostTopic path={path} />
        <Category path={path} />
        <PostSearch path={path} />
      </SectionStyle>
    </section>
  );
}

export default Section;
