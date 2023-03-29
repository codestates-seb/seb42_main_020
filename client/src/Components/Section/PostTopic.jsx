import PostTopicStlye from '../../Style/PostTopicStlye';
import MakeContents from '../MakeContents/MakeContents';

function PostTopic({ topicName }) {
  return (
    <PostTopicStlye>
      <div className="topicTemplate">
        <h2>{topicName} 게시판 ✍</h2>
        <MakeContents className="create-post">글쓰기</MakeContents>
      </div>
    </PostTopicStlye>
  );
}

export default PostTopic;
