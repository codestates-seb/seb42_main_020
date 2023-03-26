import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAccessTokenFromLocal } from '../../util/Token';
import { SUserInfoBlock, UserInfoStyle } from '../../Style/UserInfoStyle';
import UserCardProfile from './UserCardProfile';
import UserMainProfile from './UserMainProfile';

function UserInfo() {
  const [userInfo, setUserInfo] = useState([]);
  const accessToken = getAccessTokenFromLocal();

  const getUserInfo = async () => {
    await axios
      .get('/members', {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SUserInfoBlock>
      <UserInfoStyle>
        <UserCardProfile userInfo={userInfo} />
        <UserMainProfile userInfo={userInfo} />
      </UserInfoStyle>
    </SUserInfoBlock>
  );
}

export default UserInfo;
