import { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [messageApi, contextHolder] = message.useMessage();
  const [emailMsg, setEmailMsg] = useState(''); // 유효성 검사 안내 Msg for eamil
  const [passwordMsg, setPasswordMsg] = useState(''); // 유효성 검사 안내 Msg for PW

  const [isOpenModal, setIsOpenModal] = useState(false);

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
  const handleClickAlert = () => {
    messageApi.open({
      type: 'warning',
      content: emailMsg || passwordMsg || '이메일과 비밀번호를 입력해 주세요',
    });
  };

  // 유효성 검사를 통과하지 못하면 Submit 비활성화
  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isNotNull = notTobeNull({ email, password });
  const isAllValid = isEmailValid && isPwdValid && isNotNull;

  const handleClickModal = () => {
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
          <SInput onChange={handleChangeEmail} placeholder="이메일" />
          <SInput onChange={handleChangePassword} placeholder="비밀번호" />
          <div>
            <SSubmitBtn onClick={handleClickAlert}>
              <Link to="/login">로그인</Link>
            </SSubmitBtn>
          </div>
          <SGoogleLoginBtn>
            <FcGoogle />
            <span>구글로 시작하기</span>
          </SGoogleLoginBtn>
        </SFormSection>
        <SSignupInfo>
          <p>다나아 시작하기</p>
          <SSignupBtn onClick={handleClickModal}>회원 가입</SSignupBtn>
          {isOpenModal ? (
            <SModalLayout>
              <SModal>
                <SModalInfoSection>
                  <SModalInfo>
                    <p>회원 가입을 통해</p>
                    <p>다나아의 다양한 서비스를 이용해 보세요</p>
                  </SModalInfo>
                  <BsArrowReturnLeft onClick={handleClickModal} />
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
