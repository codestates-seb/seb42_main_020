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
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/access`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        if (
          res?.status === 200 &&
          res?.data === 'Access token validation successful!'
        ) {
          // console.log('엑세스 토큰 유효', res?.data);
        } else {
          // console.log('유효 검증 과정에서 에러 발생');
        }
        //! 사용자에게 노출 X
      })
      .catch((error) => {
        const refreshToken = cookies.get('refreshToken');
        if (
          error?.response?.status === 401 &&
          error?.response?.statusText === 'Unauthorized'
        ) {
          axios
            .post(`${process.env.REACT_APP_API_URL}/auth/refresh`, null, {
              headers: { Refresh: refreshToken },
            })
            .then((res) => {
              const newAccessToken = res?.headers?.authorization;
              localStorage.setItem('accessToken', newAccessToken);
            })
            .catch((error) => {
              console.log('재발급 실패', error);
            });
        } else {
          console.log('재발급 과정에서 에러 발생');
        }
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
