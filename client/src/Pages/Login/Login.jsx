import Cookies from 'universal-cookie';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, notification } from 'antd';
import {
  SMain,
  SLayout,
  SInfoSection,
  SFormSection,
  SInput,
  SSubmitBtn,
  SSignupInfo,
  SSignupBtn,
} from '../../Style/LoginStyle';
import axios from 'axios';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginState, loggedUserInfo, adminState } from '../../atoms/atoms';

const Login = () => {
  const setIsLogged = useSetRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(loggedUserInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [emailMsg, setEmailMsg] = useState(''); // 유효성 검사 안내 Msg for eamil
  const [passwordMsg, setPasswordMsg] = useState(''); // 유효성 검사 안내 Msg for PW

  const [isError, setIsError] = useState(false);
  const [noticeApi, notificationHolder] = notification.useNotification();

  const cookies = new Cookies();
  const navigate = useNavigate();
  const moveToSignup = () => navigate('/register');
  const moveToDoctorSingup = () => navigate('/medicalprovider');

  const [isAdmin, setIsAdmin] = useRecoilState(adminState);

  useEffect(() => {
    if (userInfo?.email === 'admin@mail.com') {
      setIsAdmin(!isAdmin);
    } else {
      setIsAdmin(isAdmin);
    }
  }, [userInfo]);

  // enter key를 이용한 submit 구현
  const handdlerEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/login', {
        email: email,
        password: password,
      });
      const accessToken = res.headers.authorization;
      const refreshToken = res.headers.refresh;
      localStorage.setItem('accessToken', accessToken);
      // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
      axios.defaults.headers.common['Authorization'] = `${accessToken}`;
      try {
        const userInfoRes = await axios.get('members', {
          headers: {
            'ngrok-skip-browser-warning': 'skip', // ngrok error skip용 헤더 추후 삭제 예정
          },
        });
        localStorage.setItem('loggedUserInfo', userInfoRes.data);
        setUserInfo(userInfoRes.data);
      } catch (error) {
        console.log('Error!');
        console.log(error);
      }
      cookies.set('refreshToken', refreshToken, { sameSite: 'strict' });
      setIsLogged(true);
      navigate('/home');
    } catch (error) {
      const errorStatus = error.response.status;
      if (errorStatus === 401) {
        // 이메일과 비밀번호 일치하는지 확인하라는 안내창
        setIsError(!isError);
      }
    }
  };

  const notTobeNull = ({ email, password }) => {
    return email !== null && password !== null;
  };

  // 이메일 정규 표현식
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  // 비밀번호 정규 표현식
  // 문자, 특수문자, 숫자를 포함 (글자 수 최소 8 ~ 최대 15)
  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/);
  };

  // 이메일
  const handleChangeEmail = (e) => {
    const currEmail = e.target.value;

    setEmail(currEmail);
    if (!validateEmail(email)) {
      setEmailMsg(`${currEmail} 은 올바른 이메일 형식이 아닙니다.`);
    } else {
      setEmailMsg('');
    }
  };

  // 비밀번호
  const handleChangePassword = (e) => {
    const currPassword = e.target.value;

    setPassword(currPassword);

    if (!validatePwd(password)) {
      setPasswordMsg(`비밀번호를 확인하여 주십시오.`);
    } else {
      setPasswordMsg('');
    }
  };

  // 유효성 검사 미통과 안내 Msg
  const handleFocusAlert = () => {
    setIsFocus(!isFocus);
  };

  useEffect(() => {
    if (isFocus)
      messageApi.open({
        type: '다나아',
        content: emailMsg || passwordMsg || '이메일과 비밀번호를 입력해 주세요',
      });
  }, [isFocus]);

  // Error status 401 안내
  useEffect(() => {
    if (isError)
      noticeApi.info({
        message: `다나아`,
        description: '이메일과 비밀번호를 다시 확인하여 주십시오',
        placement: 'top',
      });
  }, [isError, noticeApi]);

  // 유효성 검사를 통과하지 못하면 Submit 비활성화
  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isNotNull = notTobeNull({ email, password });
  const isAllValid = isEmailValid && isPwdValid && isNotNull;

  const refEmail = useRef();
  const refPassowrd = useRef();

  useEffect(() => {
    if (isError) refEmail.current.value = '';
    refPassowrd.current.value = '';
  }, [isError]);

  return (
    <SMain>
      <SLayout>
        {!isError ? <></> : notificationHolder}
        {isAllValid ? <></> : contextHolder}
        <SInfoSection>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
          <h1>로그인</h1>
          <p>로그인으로 다나아의 다양한 서비스를 경험해 보세요</p>
        </SInfoSection>
        <SFormSection>
          <SInput
            onChange={handleChangeEmail}
            onFocus={handleFocusAlert}
            placeholder="이메일"
            ref={refEmail}
          />
          <SInput
            type="password"
            onChange={handleChangePassword}
            onFocus={handleFocusAlert}
            placeholder="비밀번호"
            ref={refPassowrd}
            onKeyPress={handdlerEnter}
          />
          <div>
            <SSubmitBtn
              type="submit"
              disabled={!isAllValid}
              onClick={handleSubmit}
            >
              로그인
            </SSubmitBtn>
          </div>
        </SFormSection>
        <SSignupInfo>
          <div>
            <p>다나아 시작하기</p>
            <SSignupBtn onClick={moveToSignup}>회원 가입</SSignupBtn>
          </div>
          <div>
            <p>의사 회원 가입을 찾으시면</p>
            <SSignupBtn onClick={moveToDoctorSingup}>
              의료인 회원 가입
            </SSignupBtn>
          </div>
        </SSignupInfo>
      </SLayout>
    </SMain>
  );
};

export default Login;
