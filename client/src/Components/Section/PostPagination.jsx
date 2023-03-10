import { Pagination } from 'antd';
import PostPaginationStyle from '../../Style/PostPaginationStyle';

function PostPagination() {
  return (
    <PostPaginationStyle>
      <Pagination
        defaultCurrent={1}
        defaultPageSize={20} // 현재값
        total={200}
        showSizeChanger={false}

        // onChange={}
        // itemRender={}
        // onShowSizeChange={}
      />
    </PostPaginationStyle>
  );
}
export default PostPagination;
