import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import PostPaginationStyle from '../../Style/PostPaginationStyle';
import axios from 'axios';
import PostList from './PostList';

function PostPagination() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const getPost = async () => {
    //로그인이 되어있는 유저라면 자신의 게시글을 볼 수 있게 설정
    const response = await axios.get('/posts', {
      headers: {
        'ngrok-skip-browser-warning': 'skip',
      },
      // params: {
      //   page: currentPage,
      //   size: pageSize,
      // },
    });
    setPosts(response.data);
    setTotal(response.data.length);
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
      <PostList posts={posts} />
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
