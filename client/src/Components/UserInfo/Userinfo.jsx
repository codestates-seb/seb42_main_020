import UserInfoStyle from '../../Style/UserInfoStyle';
import UserCardProfile from './UserCardProfile';
import UserMainProfile from './UserMainProfile';

function UserInfo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UserInfoStyle>
        <UserCardProfile />
        <UserMainProfile />
      </UserInfoStyle>
    </div>
  );
}

export default UserInfo;
