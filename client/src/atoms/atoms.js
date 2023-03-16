import { atom } from 'recoil';

// 로그인 상태
export const loginState = atom({
  key: 'loginState',
  default: false,
});

// 로그인한 유저 정보
export const loggedUserInfo = atom({
  key: 'loggedUserInfo',
  default: null,
});
