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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3001/posts`);
      setData(response.data);
      setTotal(response.data);
    };
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  console.log(data);

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

    // defaultCurrent={page} // 페이지 넘버 기본값
    // defaultPageSize={20} // 페이지 넘버당 아이템 개수
    // total={size} // 총 아이템 개수
    // showSizeChanger={true} // 페이지 크기를 변경할 수 있는 드롭다운 메뉴가 표시

    // // onChange={}
    // // itemRender={}
    // // onShowSizeChange={}
  );
}
export default PostPagination;
