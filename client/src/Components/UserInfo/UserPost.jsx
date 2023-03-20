import UserPostCategory from './UserPostCategory';
import PostPagination from '../Section/PostPagination';
import UserPostStyle from '../../Style/UserPostStyle';

function UserPost() {
  return (
    <UserPostStyle>
      <UserPostCategory />
      <PostPagination />
    </UserPostStyle>
  );
}

export default UserPost;
