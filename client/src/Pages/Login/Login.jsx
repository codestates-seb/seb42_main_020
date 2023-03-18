import Cookies from 'universal-cookie';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBodyScrollLock } from '../../util/useBodyScrollLock';
import useDidMountEffect from '../../util/useDidMountEffect';
import { FcGoogle } from 'react-icons/fc';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { message } from 'antd';
import {
  SMain,
  SLayout,
  SInfoSection,
  SFormSection,
  SInput,
  SSubmitBtn,
  SGoogleLoginBtn,
  SSignupInfo,
  SSignupBtn,
  SModalLayout,
  SModal,
  SModalInfoSection,
  SModalBtnSection,
  SModalInfo,
  SModalSignupBtn,
} from '../../Style/LoginStyle';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loginState, loggedUserInfo } from '../../atoms/atoms';

const Login = () => {
  const setIsLogged = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(loggedUserInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [emailMsg, setEmailMsg] = useState(''); // 유효성 검사 안내 Msg for eamil
  const [passwordMsg, setPasswordMsg] = useState(''); // 유효성 검사 안내 Msg for PW

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post('/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        const accessToken = res.headers.authorization;
        const refreshToken = res.headers.refresh;
        localStorage.setItem('accessToken', accessToken);
        // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
        axios.defaults.headers.common['Authorization'] = `${accessToken}`;

        axios
          .get(`/members`, {
            headers: {
              'ngrok-skip-browser-warning': 'skip', // ngrok error skip용 헤더 추후 삭제 예정
            },
          })
          .then((res) => {
            localStorage.setItem('loggedUserInfo', res.data);
            setUserInfo(res.data);
          });

        cookies.set('refreshToken', refreshToken, { sameSite: 'strict' });
        setIsLogged(true);
        navigate('/home');
      })
      .catch((data) => {
        console.log('Error!');
        console.log(data);
      });
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

  useDidMountEffect(() => {
    messageApi.open({
      type: 'warning',
      content: emailMsg || passwordMsg || '이메일과 비밀번호를 입력해 주세요',
    });
  }, [isFocus]);

  // 유효성 검사를 통과하지 못하면 Submit 비활성화
  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isNotNull = notTobeNull({ email, password });
  const isAllValid = isEmailValid && isPwdValid && isNotNull;

  const handleOpen = () => {
    lockScroll();
    setIsOpenModal(!isOpenModal);
  };

  const handleClose = () => {
    openScroll();
    setIsOpenModal(!isOpenModal);
  };

  return (
    <SMain>
      <SLayout>
        {isAllValid ? null : contextHolder}
        <SInfoSection>
          <img src="images/logo.png" alt="logo" />
          <h1>로그인</h1>
          <p>로그인으로 다나아의 다양한 서비스를 경험해 보세요</p>
        </SInfoSection>
        <SFormSection>
          <SInput
            onChange={handleChangeEmail}
            onFocus={handleFocusAlert}
            placeholder="이메일"
          />
          <SInput
            type="password"
            onChange={handleChangePassword}
            onFocus={handleFocusAlert}
            placeholder="비밀번호"
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
          <SGoogleLoginBtn>
            <FcGoogle />
            <span>구글로 시작하기</span>
          </SGoogleLoginBtn>
        </SFormSection>
        <SSignupInfo>
          <p>다나아 시작하기</p>
          <SSignupBtn onClick={handleOpen}>회원 가입</SSignupBtn>
          {isOpenModal ? (
            <SModalLayout>
              <SModal>
                <SModalInfoSection>
                  <SModalInfo>
                    <p>회원 가입을 통해</p>
                    <p>다나아의 다양한 서비스를 이용해 보세요</p>
                  </SModalInfo>
                  <BsArrowReturnLeft onClick={handleClose} />
                </SModalInfoSection>
                <SModalBtnSection>
                  <SModalSignupBtn>
                    <Link to="/register">회원 가입</Link>
                  </SModalSignupBtn>
                  <SModalSignupBtn>
                    <Link to="/medicalprovider">의료인 회원가입</Link>
                  </SModalSignupBtn>
                </SModalBtnSection>
              </SModal>
            </SModalLayout>
          ) : null}
        </SSignupInfo>
      </SLayout>
    </SMain>
  );
};

export default Login;
