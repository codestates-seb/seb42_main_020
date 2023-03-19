import PostTopicStlye from '../../Style/PostTopicStlye';
import MakeContents from '../MakeContents/MakeContents';
import { Select, Space } from 'antd';

function PostTopic() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <PostTopicStlye>
      <div className="topicTemplate">
        <h2>전체 게시판 ✍</h2>
        <Space wrap style={{ marginBottom: -10 }}>
          <Select
            defaultValue="latest"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: 'latest',
                label: '최신순',
              },
              {
                value: 'like',
                label: '인기순',
              },
              {
                value: 'doctor',
                label: '전문의 답변',
              },
              {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
              },
            ]}
          />
          <MakeContents className="create-post">글쓰기</MakeContents>
        </Space>
      </div>
    </PostTopicStlye>
  );
}

export default PostTopic;
