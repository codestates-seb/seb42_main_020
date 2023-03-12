import UserInfoStyle from '../../Style/UserInfoStyle';
import UserCardProfile from './UserCardProfile';

function Userinfo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UserInfoStyle>
        <UserCardProfile></UserCardProfile>
      </UserInfoStyle>
    </div>
  );
}

export default Userinfo;
