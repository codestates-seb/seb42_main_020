import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { message } from 'antd';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { FcInfo } from 'react-icons/fc';

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
  margin: 0 0 10px 0px;
  button {
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 16px;
  }
`;

const SInput = styled.input`
  width: 400px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const STermSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0 10px 0;
`;

const STerm = styled.div`
  padding: 10px 0;
  border-top: 1px solid var(--gray-300);
  div {
    padding: 5px 0;
  }
`;

const SFileInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 0px;
  input {
    display: inline-block;
    width: 50%;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
    :hover {
      color: var(--blue-700);
    }
  }
`;

const SPolicy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  svg {
    font-size: 20px;
  }
`;

const SSubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-200);
  border: 1px solid var(--blue-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 3px;
  cursor: pointer;
`;

const SLoginInfo = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
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

const SLoginBtn = styled.button`
  width: 160px;
  height: 32px;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-200);
  border-radius: 3px;
  a {
    text-decoration: none;
    color: var(--black);
  }
  :hover {
    background-color: var(--blue-200);
  }
  cursor: pointer;
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
  flex-direction: column !important;
  justify-content: center;
  align-items: flex-end !important;
  position: fixed;
  width: 50vw;
  height: 45vh;
  top: 25vh;
  right: 25vw;
  background-color: var(--white);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 30px;
  svg {
    margin: 32px;
    font-size: 1.5rem;
    cursor: pointer;
    :hover {
      background-color: var(--gray-200);
      border-radius: 5px;
    }
  }
`;

const DoctorRegiInfo = styled.div`
  width: 900px;
  height: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center !important;
  margin: 30px;
`;

const Doctorsignup = () => {
  const [name, setName] = useState('');
  const [hospital, setHospital] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [messageApi, contextHolder] = message.useMessage();
  const [hospitalMsg, setHospitalMsg] = useState(''); // 유효성 검사 안내 Msg for 병원명
  const [emailMsg, setEmailMsg] = useState(''); // Msg for eamil
  const [passwordMsg, setPasswordMsg] = useState(''); // Msg for PW

  const [isOpenModal, setIsOpenModal] = useState(false);

  const notTobeNull = ({ hospital, email, password }) => {
    return hospital !== null && email !== null && password !== null;
  };

  // 닉네임 정규 표현식
  // 한글, 영어만 입력 받기
  const vaildateName = () => {
    return name.match(/([a-z|A-Z|ㄱ-ㅎ|가-힣]).{1,15}$/);
  };

  // 병원명 정규 표현식
  // 한글, 영어만 입력 받기
  const vaildateHospital = () => {
    return hospital.match(/([a-z|A-Z|ㄱ-ㅎ|가-힣]).{1,15}$/);
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

  // 이름
  const handleChangeName = (e) => {
    const currName = e.target.value;
    setName(currName);

    // 이름과 조건식이 같은 병원명으로 안내 Msg 설정
    if (!vaildateName(name)) {
      setHospitalMsg(
        '한글과 영문을 제외한 숫자 및 특수문자는 입력이 어렵습니다.'
      );
    } else {
      setHospitalMsg('');
    }
  };

  // 병원명
  const handleChangeHospital = (e) => {
    const currHospital = e.target.value;
    setHospital(currHospital);

    if (!setHospitalMsg(hospital)) {
      setHospitalMsg(
        '한글과 영문을 제외한 숫자 및 특수문자는 입력이 어렵습니다.'
      );
    } else {
      setHospitalMsg('');
    }
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
      content: emailMsg || passwordMsg || hospitalMsg || '내용을 입력해 주세요',
    });
  };

  // 유효성 검사를 통과하지 못하면 Submit 비활성화
  const isvaildateName = vaildateName(name);
  const isHospitalVaild = vaildateHospital(hospital);
  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isNotNull = notTobeNull({ name, hospital, email, password });
  const isAllValid =
    isvaildateName &&
    isHospitalVaild &&
    isEmailValid &&
    isPwdValid &&
    isNotNull;

  const handleClickModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <SMain>
      <SLayout>
        {isAllValid ? null : contextHolder}
        <SInfoSection>
          <img src="images/logo.png" alt="logo" />
          <h1>의료인 회원가입</h1>
          <p>회원가입으로 다나아의 다양한 서비스를 경험해 보세요</p>
        </SInfoSection>
        <SFormSection>
          <div>
            <SInput onChange={handleChangeName} placeholder="이름" />
            <SInput onChange={handleChangeHospital} placeholder="병원명" />
            <SInput onChange={handleChangeEmail} placeholder="이메일" />
            <SInput onChange={handleChangePassword} placeholder="비밀번호" />
          </div>
          <SFileInput>
            <input type="file" id="profile-upload" accept="image/*" />
            <SPolicy>
              <FcInfo />
              <button onClick={handleClickModal}>인증 상세안내</button>
            </SPolicy>
          </SFileInput>
          <STermSection>
            <STerm>
              <input type="checkbox" name="" value="" />
              전체 동의
            </STerm>
            <STerm>
              <div>
                <input type="checkbox" name="" value="" />
                서비스 이용약관
              </div>
              <div>
                <input type="checkbox" name="" value="" />
                위치 기반 서비스
              </div>
            </STerm>
          </STermSection>
          <SSubmitBtn onClick={handleClickAlert}>회원가입</SSubmitBtn>
        </SFormSection>
        <SLoginInfo>
          <div>
            <p>다나아의 회원이신가요?</p>
            <SLoginBtn>
              <Link to="/login">로그인</Link>
            </SLoginBtn>
          </div>
          <div>
            <p>질문 및 리뷰 작성을 위한 </p>
            <SLoginBtn>
              <Link to="/register">회원가입</Link>
            </SLoginBtn>
          </div>
          {isOpenModal ? (
            <SModalLayout>
              <SModal>
                <BsArrowReturnLeft onClick={handleClickModal} />
                <DoctorRegiInfo>안내 이미지 예정</DoctorRegiInfo>
              </SModal>
            </SModalLayout>
          ) : null}
        </SLoginInfo>
      </SLayout>
    </SMain>
  );
};

export default Doctorsignup;
