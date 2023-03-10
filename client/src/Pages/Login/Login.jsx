import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { message } from 'antd';

const SMain = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--blue-50);
`;

const SLayout = styled.div`
  width: 500px;
  height: 800px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  box-shadow: 0 10px 3px 0 var(--gray-200);
  border-radius: 30px;
`;

const SInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--gray-800);
  padding: 20px 0;
  img,
  h1,
  p {
    padding: 10px 0 0 0;
  }
  img {
    width: 50px;
  }
  h1 {
    font-family: 'TheJamsil5Bold';
    font-size: 32px;
  }
  p {
    font-family: 'TheJamsil';
    font-weight: 500;
  }
`;

const SFormSection = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  div {
    border-bottom: 1px solid var(--gray-300);
  }
  button {
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 16px;
  }
`;

const SInput = styled.input`
  height: 2.5rem;
  margin: 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SSubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-200);
  border: 1px solid var(--blue-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 3px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: var(--black);
  }
`;

const SGoogleLoginBtn = styled(SSubmitBtn)`
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  svg {
    font-size: 25px;
    margin: 0 5px 0 0;
  }
`;

const SSignupInfo = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  button {
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 16px;
  }
  p {
    font-family: 'TheJamsil';
    font-weight: 400;
    font-size: 16px;
    color: var(--gray-800);
  }
`;

const SSignupBtn = styled(SSubmitBtn)`
  width: 50%;
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
`;

const SModalLayout = styled.div`
  background-color: rgb(0 0 0 / 30%);
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

const SModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  width: 50vw;
  height: 45vh;
  top: 25vh;
  right: 25vw;
  background-color: var(--white);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 30px;
`;

const SModalInfoSection = styled.div`
  height: 20%;
  padding: 0 25px;
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  svg {
    margin-top: 16px;
    font-size: 1.5rem;
    cursor: pointer;
    :hover {
      background-color: var(--gray-200);
      border-radius: 5px;
    }
  }
`;

const SModalBtnSection = styled.div`
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SModalInfo = styled.div`
  p {
    margin: 16px 0 0 0;
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

const SModalSignupBtn = styled.button`
  width: 20rem;
  height: 10rem;
  font-family: TheJamsil;
  font-weight: 600;
  font-size: 22px !important;
  margin: 0 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 3px 3px 1px var(--gray-400);
  a {
    text-decoration: none;
    color: var(--gray-800);
  }
  :hover {
    background-color: var(--mint-100);
    border: inset;
  }
  cursor: pointer;
`;

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
