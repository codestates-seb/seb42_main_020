import PostListTemplateStyle from '../../Style/PostListTemplateStyle';
import PostList from './PostList';

function PostListTemplate({ data }) {
  return (
    <PostListTemplateStyle>
      <PostList data={data} />
    </PostListTemplateStyle>
  );
}

export default PostListTemplate;
