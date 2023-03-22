import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getRefreshTokenToCookie = (refreshToken) => {
  return cookies.set('refreshToken', refreshToken, { sameSite: 'strict' });
};

export const setAccessTokenToLocal = (accessToken) => {
  return localStorage.setItem('accessToken', accessToken);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('recoil-persist');
  localStorage.removeItem('loggedUserInfo');
  cookies.remove('refreshToken');
  location.reload();
};
