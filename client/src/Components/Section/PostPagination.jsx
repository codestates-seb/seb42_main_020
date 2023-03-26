import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import PostPaginationStyle from '../../Style/PostPaginationStyle';
import axios from 'axios';
import PostList from './PostList';

function PostPagination({ keyword, isFiltered, setIsFiltered, topicName }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const locationGetPost = async () => {
    if (!isFiltered) {
      const response = await axios.get('/posts', {
        headers: {
          'ngrok-skip-browser-warning': 'skip',
        },
        params: {
          region: topicName,
        },
      });
      setPosts(response.data);
      setTotal(response.datalength);
      setIsFiltered(() => false);
    }
  };
  const subjectGetPost = async () => {
    if (!isFiltered) {
      const response = await axios.get('/posts', {
        headers: {
          'ngrok-skip-browser-warning': 'skip',
        },
        params: {
          medicalTag: topicName,
        },
      });
      setPosts(response.data);
      setTotal(response.datalength);
      setIsFiltered(() => false);
    }
  };

  const getPost = async () => {
    switch (topicName) {
      case '전체':
        if (!isFiltered) {
          const response = await axios.get('/posts', {
            headers: {
              'ngrok-skip-browser-warning': 'skip',
            },
          });
          setPosts(response.data);
          setTotal(response.data.length);
          setIsFiltered(() => false);
        }
        break;
      case '질문':
        if (!isFiltered) {
          const response = await axios.get('/posts', {
            headers: {
              'ngrok-skip-browser-warning': 'skip',
            },
            params: {
              postType: 'question',
            },
          });
          setPosts(response.data);
          setTotal(response.data.length);
          setIsFiltered(() => false);
        }
        break;
      case '리뷰':
        if (!isFiltered) {
          const response = await axios.get('/posts', {
            headers: {
              'ngrok-skip-browser-warning': 'skip',
            },
            params: {
              postType: 'review',
            },
          });
          setPosts(response.data);
          setTotal(response.datalength);
          setIsFiltered(() => false);
        }
        break;
      case '강남구':
        locationGetPost();
        break;
      case '강서구':
        locationGetPost();
        break;
      case '강북구':
        locationGetPost();
        break;
      case '용산구':
        locationGetPost();
        break;
      case '관악구':
        locationGetPost();
        break;
      case '중구':
        locationGetPost();
        break;
      case '서초구':
        locationGetPost();
        break;
      case '송파구':
        locationGetPost();
        break;
      case '마포구':
        locationGetPost();
        break;
      case '서대문구':
        locationGetPost();
        break;
      case '치과':
        subjectGetPost();
        break;
      case '안과':
        subjectGetPost();
        break;
      case '피부과':
        subjectGetPost();
        break;
      case '성형외과':
        subjectGetPost();
        break;
      case '산부인과':
        subjectGetPost();
        break;
      case '정신건강의학과':
        subjectGetPost();
        break;
      case '비뇨기과':
        subjectGetPost();
        break;
      case '정형외과':
        subjectGetPost();
        break;
      case '마취통증의학과':
        subjectGetPost();
        break;
      case '신경외과':
        subjectGetPost();
        break;
      case '재활의학과':
        subjectGetPost();
        break;
      case '영상의학과':
        subjectGetPost();
        break;
      case '외과':
        subjectGetPost();
        break;
      case '신경과':
        subjectGetPost();
        break;
      case '소아과':
        subjectGetPost();
        break;
      case '내과':
        subjectGetPost();
        break;
      case '이빈후과':
        subjectGetPost();
        break;
      case '가정의학과':
        subjectGetPost();
        break;
      case '한의원':
        subjectGetPost();
        break;
      case '기타':
        subjectGetPost();
        break;
    }
  };

  useEffect(() => {
    getPost();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      {isFiltered ? (
        <PostList posts={keyword} topicName={topicName} />
      ) : (
        <PostList posts={posts} topicName={topicName} />
      )}
      <PostPaginationStyle>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </PostPaginationStyle>
    </>
  );
}
export default PostPagination;
