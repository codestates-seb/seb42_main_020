import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const loggedUserInfo = atom({
  key: 'loggedUserInfo',
  default: null,
});
