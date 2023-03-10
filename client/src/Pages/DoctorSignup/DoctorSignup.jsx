import { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { FcInfo } from 'react-icons/fc';
import {
  SMain,
  SLayout,
  SInfoSection,
  SFormSection,
  SInput,
  STermSection,
  STerm,
  SFileInput,
  SPolicy,
  SSubmitBtn,
  SLoginInfo,
  SLoginBtn,
  SModalLayout,
  SModal,
  DoctorRegiInfo,
} from '../../Style/DoctorSignupStyle';

const DoctorSignup = () => {
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

export default DoctorSignup;
