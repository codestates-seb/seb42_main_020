import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import PostPaginationStyle from '../../Style/PostPaginationStyle';
import axios from 'axios';
import PostList from './PostList';

function PostPagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const accessToken = localStorage.getItem('accessToken');

  const getPost = async () => {
    if (JSON.parse(localStorage.getItem('recoil-persist')).loginState)
      axios.defaults.headers.common['Authorization'] = `${accessToken}`;
    const response = await axios.get('/posts', {
      headers: {
        'ngrok-skip-browser-warning': 'skip',
      },
      params: {
        page: currentPage,
        size: pageSize,
      },
    });
    setData(response.data);
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
      <PostList data={data} />
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
