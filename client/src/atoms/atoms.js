import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 로그인 상태
export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 로그인한 유저 정보
export const loggedUserInfo = atom({
  key: 'loggedUserInfo',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
