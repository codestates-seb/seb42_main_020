import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import PostPaginationStyle from '../../Style/PostPaginationStyle';
import axios from 'axios';

import PostListTemplate from './PostListTemplate';

function PostPagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/posts`, {
      params: {
        page: currentPage,
        size: pageSize,
      },
    });
    setData(response.data);
    setTotal(response.data.length);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <PostListTemplate data={data} />
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
