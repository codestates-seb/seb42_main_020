import PostSearchStyle from '../../Style/PostSearchStyle';
import { Input, Space, Select } from 'antd';
import { useReducer, useState } from 'react';
import axios from 'axios';
import PostPagination from './PostPagination';

const { Search } = Input;
function PostSearch({ topicName }) {
  const [keyword, setKeyword] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const categoryReducer = async (state, action) => {
    if (keyword.length !== 0) {
      switch (action.type) {
        case 'titleContent':
          return await axios
            .get(`${process.env.REACT_APP_API_URL}/posts`, {
              headers: {
                'ngrok-skip-browser-warning': 'skip',
              },
              params: {
                filterType: 4,
                keyword: keyword,
              },
            })
            .then((res) => {
              setKeyword(res.data);
              setIsFiltered(true);
            })
            .catch((err) => Promise.reject(new Error(err)));
        case 'title':
          return await axios
            .get(`${process.env.REACT_APP_API_URL}/posts`, {
              headers: {
                'ngrok-skip-browser-warning': 'skip',
              },
              params: {
                filterType: 1,
                keyword: keyword,
              },
            })
            .then((res) => {
              setKeyword(res.data);
              setIsFiltered(true);
            })
            .catch((err) => Promise.reject(new Error(err)));
        case 'content':
          return await axios
            .get(`${process.env.REACT_APP_API_URL}/posts`, {
              headers: {
                'ngrok-skip-browser-warning': 'skip',
              },
              params: {
                filterType: 2,
                keyword: keyword,
              },
            })
            .then((res) => {
              setKeyword(res.data);
              setIsFiltered(true);
            })
            .catch((err) => Promise.reject(new Error(err)));
        case 'user':
          return await axios
            .get(`${process.env.REACT_APP_API_URL}/posts`, {
              headers: {
                'ngrok-skip-browser-warning': 'skip',
              },
              params: {
                filterType: 3,
                keyword: keyword,
              },
            })
            .then((res) => {
              setKeyword(res.data);
              setIsFiltered(true);
            })
            .catch((err) => Promise.reject(new Error(err)));
        default:
          return state;
      }
    }
  };

  const handleCategory = (selectCategory) => {
    switch (selectCategory) {
      case 'titleContent':
        return dispatch({ type: 'titleContent' });
      case 'title':
        return dispatch({ type: 'title' });
      case 'content':
        return dispatch({ type: 'content' });
      case 'user':
        return dispatch({ type: 'user' });
      default:
        return dispatch({ type: 'titleContent' });
    }
  };

  const [curCategory, dispatch] = useReducer(categoryReducer, {
    type: 'titleContent',
  });

  const [category, setCategory] = useState(curCategory);
  const onSearch = (e) => {
    setKeyword(e);
    handleCategory(category);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <PostPagination
        keyword={keyword}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
        topicName={topicName}
      />
      <PostSearchStyle>
        <Space wrap style={{ marginBottom: -10 }}>
          <Select
            defaultValue={category.type}
            style={{ width: 120, marginBottom: 8, marginRight: 20 }}
            size="large"
            onChange={(e) => setCategory(e)}
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
            placeholder="키워드 검색"
            allowClear
            enterButton="확인"
            onSearch={onSearch}
            size="large"
          />
        </Space>
      </PostSearchStyle>
    </>
  );
}

export default PostSearch;
