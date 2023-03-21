import SectionStyle from '../../Style/SectionStyle';
import PostTopic from './PostTopic';
import Category from './Category';
import PostSearch from './PostSearch';

function Section() {
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SectionStyle>
        <PostTopic />
        <Category />
        <PostSearch />
      </SectionStyle>
    </section>
  );
}

export default Section;
