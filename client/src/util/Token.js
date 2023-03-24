import axios from 'axios';
import { useEffect } from 'react';
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

export const getAccessTokenFromLocal = () => {
  // 1. 엑세스 토큰을 가져옴
  // 2. 가져와서 검증 과정을 거침 - get (/auth/access)
  // 3. 유효하면 기존 엑세스 토큰 리턴
  // 4. 유효하지 않을 경우 리프레시 토큰으로 새 엑세스 토큰 발급 - post (/auth/refresh)
  // 5. 엑세스 토큰 재발급 받으 것으로 변경
  // 6. 뉴 엑세스 토큰 리턴

  /*  const resAccess = axios.get('auth/access', null, {
    Headers: { Authorization: accessToken },
  });

  if (resAccess?.status === 200) {
    return console.log('200');
  } else if (resAccess?.status === 401) {
    const resRefresh = axios.post('/auth/refresh', null, {
      headers: { Refresh: refreshToken },
    });
    const newAccessToken = resRefresh?.headers?.authorization;
    setAccessTokenToLocal(newAccessToken);
    return console.log('401');
  }
  */

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = cookies.get('refreshToken');
    axios
      .get('/auth/access', null, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        if (res?.status === 200) {
          console.log('엑세스 토큰 유효', res);
        } else if (res?.status === 401) {
          console.log('엑세스 토큰 만료');
          axios
            .post('/auth/refresh', null, {
              headers: { Refresh: refreshToken },
            })
            .then((res) => {
              const newAccessToken = res?.headers?.authorization;
              setAccessTokenToLocal(newAccessToken);
            })
            .catch((error) => {
              console.log('재발급 실패', error);
            });
        }
      })
      .catch((error) => {
        console.log('토큰 검증과정 에러');
        console.log(error);
      });
  }, []);
  return localStorage.getItem('accessToken');
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('recoil-persist');
  localStorage.removeItem('loggedUserInfo');
  cookies.remove('refreshToken');
  location.reload();
};
