import SectionStyle from '../../Style/SectionStyle';
import PostTopic from './PostTopic';
import Category from './Category';
import PostPagination from './PostPagination';
import PostSearch from './PostSearch';

function Section() {
  return (
    <SectionStyle>
      <PostTopic />
      <Category />
      <PostPagination />
      <PostSearch />
    </SectionStyle>
  );
}

export default Section;
