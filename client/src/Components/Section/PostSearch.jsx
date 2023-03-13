import PostSearchStyle from '../../Style/PostSearchStyle';
import { Input, Space, Select } from 'antd';

const { Search } = Input;
const onSearch = (value) => console.log(value);

function PostSearch() {
  return (
    <PostSearchStyle>
      <Space wrap style={{ marginBottom: -10 }}>
        <Select
          defaultValue="titleContent"
          style={{ width: 120, marginBottom: 8, marginRight: 20 }}
          size="large"
          // onChange={handleChange}
          options={[
            {
              value: 'titleContent',
              label: '제목+내용',
            },
            {
              value: 'title',
              label: '제목',
            },
            {
              value: 'content',
              label: '내용',
            },
            {
              value: 'user',
              label: '글쓴이',
            },
          ]}
        />
      </Space>
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
    </PostSearchStyle>
  );
}

export default PostSearch;
