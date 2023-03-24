import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getRefreshTokenToCookie = (refreshToken) => {
  return cookies.get(refreshToken);
};

export const setRefreshTokenToCookie = (refreshToken) => {
  return cookies.set('refreshToken', refreshToken, { sameSite: 'strict' });
};

export const setAccessTokenToLocal = (accessToken) => {
  return localStorage.setItem('accessToken', accessToken);
};

export const getAccessTokenFromLocal = async () => {
  // 1. 엑세스 토큰을 가져옴
  // 2. 가져와서 검증 과정을 거침 - get (/auth/access)
  // 3. 유효하면 기존 엑세스 토큰 리턴
  // 4. 유효하지 않을 경우 리프레시 토큰으로 새 엑세스 토큰 발급 - post (/auth/refresh)
  // 5. 엑세스 토큰 재발급 받으 것으로 변경
  // 6. 뉴 엑세스 토큰 리턴

  const accessToken = localStorage.getItem('accessToken'); // 1
  const refreshToken = cookies.get('refreshToken');

  // 2
  const resAccess = await axios.get('auth/access', null, {
    Headers: { Authorization: accessToken },
  });

  const retrunAccessToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  };

  // 3
  if (resAccess?.status === 200) {
    const data = await retrunAccessToken;
    return data;
  } else if (resAccess?.status === 401) {
    // 4
    const resRefresh = await axios.post('/auth/refresh', null, {
      headers: { Refresh: refreshToken },
    });
    //5
    const newAccessToken = resRefresh?.headers?.authorization;
    setAccessTokenToLocal(newAccessToken);
    return console.log('401'); // 6
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('recoil-persist');
  localStorage.removeItem('loggedUserInfo');
  cookies.remove('refreshToken');
  location.reload();
};
