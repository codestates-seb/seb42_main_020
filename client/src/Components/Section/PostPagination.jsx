import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import PostPaginationStyle from '../../Style/PostPaginationStyle';
import axios from 'axios';
import PostList from './PostList';

function PostPagination({ keyword, isFiltered, setIsFiltered }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const getPost = async () => {
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
      {isFiltered ? <PostList posts={keyword} /> : <PostList posts={posts} />}
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
