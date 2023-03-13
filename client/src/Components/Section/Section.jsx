import SectionStyle from '../../Style/SectionStyle';
import PostTopic from './PostTopic';
import Category from './Category';
import PostPagination from './PostPagination';
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
        <PostPagination />
        <PostSearch />
      </SectionStyle>
    </section>
  );
}

export default Section;
