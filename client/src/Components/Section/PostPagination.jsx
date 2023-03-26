import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import {
  PostPaginationStyle,
  SPostListSection,
} from '../../Style/PostPaginationStyle';
import axios from 'axios';
import PostList from './PostList';

function PostPagination({ keyword, isFiltered, setIsFiltered, topicName }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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
          page: currentPage === 0 ? 0 : currentPage - 1,
        },
      });
      setPosts(response.data);
      setTotal(response.data.pageInfo.totalElements);
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
          page: currentPage === 0 ? 0 : currentPage - 1,
        },
      });
      setPosts(response.data);
      setTotal(response.data.pageInfo.totalElements);
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
            params: {
              page: currentPage === 0 ? 0 : currentPage - 1,
            },
          });
          setPosts(response.data);
          setTotal(response.data.pageInfo.totalElements);
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
              page: currentPage === 0 ? 0 : currentPage - 1,
            },
          });
          setPosts(response.data);
          setTotal(response.data.pageInfo.totalElements);
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
              page: currentPage === 0 ? 0 : currentPage - 1,
            },
          });
          setPosts(response.data);
          setTotal(response.data.pageInfo.totalElements);
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
      case '성동구':
        locationGetPost();
        break;
      case '은평구':
        locationGetPost();
        break;
      case '동대문구':
        locationGetPost();
        break;
      case '동작구':
        locationGetPost();
        break;
      case '노원구':
        locationGetPost();
        break;
      case '도봉구':
        locationGetPost();
        break;
      case '영등포구':
        locationGetPost();
        break;
      case '중랑구':
        locationGetPost();
        break;
      case '금천구':
        locationGetPost();
        break;
      case '광진구':
        locationGetPost();
        break;
      case '성북구':
        locationGetPost();
        break;
      case '구로구':
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
    console.log(currentPage);
  };

  return (
    <>
      {isFiltered ? (
        <SPostListSection>
          <PostList posts={keyword} topicName={topicName} />
        </SPostListSection>
      ) : (
        <SPostListSection>
          <PostList posts={posts} topicName={topicName} />
        </SPostListSection>
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
