import { UserPostStyle } from '../../Style/UserPostStyle';
import UserPostCategory from './UserPostCategory';
import UserPostList from './UserPostList';

function UserPost() {
  return (
    <UserPostStyle>
      <UserPostCategory />
      <UserPostList />
    </UserPostStyle>
  );
}

export default UserPost;
