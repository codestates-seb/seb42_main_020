import { useGoogleLogin } from '@react-oauth/google';
import { SGoogleLoginBtn } from '../../Style/LoginStyle';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const GoolgeButton = () => {
  const googleLogin = useGoogleLogin({
    //flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post('/auth/google', {
        code: codeResponse.code,
      });

      console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <SGoogleLoginBtn onClick={() => googleLogin()}>
      <FcGoogle />
      <span>구글로 시작하기</span>
    </SGoogleLoginBtn>
  );
};

export default GoolgeButton;
