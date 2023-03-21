import UserPostCategory from './UserPostCategory';
import UserPostPagination from './UserPostPagination';
import UserPostStyle from '../../Style/UserPostStyle';

function UserPost() {
  return (
    <UserPostStyle>
      <UserPostCategory />
      <UserPostPagination />
    </UserPostStyle>
  );
}

export default UserPost;
