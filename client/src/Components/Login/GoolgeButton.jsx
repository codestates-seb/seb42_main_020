import { useGoogleLogin } from '@react-oauth/google';
import { SGoogleLoginBtn } from '../../Style/LoginStyle';
import { FcGoogle } from 'react-icons/fc';

const GoolgeButton = () => {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });
  return (
    <SGoogleLoginBtn onClick={() => googleSocialLogin()}>
      <FcGoogle />
      <span>구글로 시작하기</span>
    </SGoogleLoginBtn>
  );
};

export default GoolgeButton;
