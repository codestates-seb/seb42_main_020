import { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import { PostPaginationStyle } from '../../Style/PostPaginationStyle';
import UserPostList from './UserPostList';
import axios from 'axios';
import { getAccessTokenFromLocal } from '../../util/Token';

function UserPostPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [posts, setPosts] = useState([]);

  const accessToken = getAccessTokenFromLocal();

  const getUserPost = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/members`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
  };

  useEffect(() => {
    getUserPost();
    setTotal(posts.length);
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <UserPostList posts={posts} />
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
export default UserPostPagination;
