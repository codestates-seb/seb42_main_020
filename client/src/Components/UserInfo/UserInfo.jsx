import axios from 'axios';
import { useEffect, useState } from 'react';
import UserInfoStyle from '../../Style/UserInfoStyle';
import UserCardProfile from './UserCardProfile';
import UserMainProfile from './UserMainProfile';

function UserInfo() {
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');
    await axios
      .get('/members', {
        headers: {
          'ngrok-skip-browser-warning': 'skip',
          Authorization: accessToken,
        },
      })
      .then((res) => setUserInfo(res.data));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UserInfoStyle>
        <UserCardProfile userInfo={userInfo} />
        <UserMainProfile userInfo={userInfo} />
      </UserInfoStyle>
    </div>
  );
}

export default UserInfo;
