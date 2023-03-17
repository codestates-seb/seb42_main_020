import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBodyScrollLock } from '../../util/useBodyScrollLock';
import { message } from 'antd';
import {
  SMain,
  SLayout,
  SInfoSection,
  SFormSection,
  SInput,
  STermSection,
  STerm,
  SSubmitBtn,
  SLoginInfo,
  SLoginBtn,
} from '../../Style/SignupStyle';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [messageApi, contextHolder] = message.useMessage();
  const [nameMsg, setNameMsg] = useState(''); // 유효성 검사 안내 Msg for name && nickname
  const [emailMsg, setEmailMsg] = useState(''); // Msg for eamil
  const [passwordMsg, setPasswordMsg] = useState(''); // Msg for PW

  const [checkedService, setCheckedService] = useState(false); // 이용약관 동의
  const [checkedLocation, setCheckedLocation] = useState(false); // 위치 기반 서비스 동의

  const { openScroll } = useBodyScrollLock(); // 페이지 이동 후 scroll lock 해제
  openScroll();

  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post('/members/signup', {
        email: email,
        name: name,
        displayName: displayName,
        password: password,
      })
      .then((res) => {
        console.log(res);
        navigate('/login');
      })
      .catch((data) => {
        console.log('Error!');
        console.log(data);
        // 회원가입 실패 안내창 띄우기
      });
  };

  const notTobeNull = ({ name, displayName, email, password }) => {
    return (
      name !== null &&
      displayName !== null &&
      email !== null &&
      password !== null
    );
  };

  // 이름 정규 표현식
  // 한글, 영어만 입력 받기
  const vaildateName = () => {
    return name.match(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/);
  };

  // 닉네임 정규 표현식
  // 한글, 영어만 입력 받기
  const vaildateNickname = () => {
    return displayName.match(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/);
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

    if (!vaildateName(name)) {
      // 오류 안내창 닉네임과 공유
      setNameMsg('한글과 영문을 제외한 숫자 및 특수문자는 입력이 어렵습니다.');
    } else {
      setNameMsg('');
    }
  };

  // 닉네임
  const handleChangeNickname = (e) => {
    const currNickname = e.target.value;
    setDisplayName(currNickname);

    if (!vaildateNickname(displayName)) {
      setNameMsg('한글과 영문을 제외한 숫자 및 특수문자는 입력이 어렵습니다.');
    } else {
      setNameMsg('');
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
      content: emailMsg || passwordMsg || nameMsg || '내용을 입력해 주세요',
    });
  };

  // 이용약관 유효성 검사
  const handleClickTermService = (e) => {
    setCheckedService(e.target.checked);
  };

  const handleClickTermLocation = (e) => {
    setCheckedLocation(e.target.checked);
  };

  // 유효성 검사를 통과하지 못하면 Submit 비활성화
  const isvaildateName = vaildateName(name);
  const isNicknameVaild = vaildateNickname(displayName);
  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isNotNull = notTobeNull({ name, displayName, email, password });
  const isAllValid =
    isvaildateName &&
    isNicknameVaild &&
    isEmailValid &&
    isPwdValid &&
    isNotNull &&
    checkedService &&
    checkedLocation;

  return (
    <SMain>
      <SLayout>
        {isAllValid ? null : contextHolder}
        <SInfoSection>
          <img src="images/logo.png" alt="logo" />
          <h1>회원가입</h1>
          <p>회원가입으로 다나아의 다양한 서비스를 경험해 보세요</p>
        </SInfoSection>
        <SFormSection>
          <div>
            <SInput
              onClick={handleClickAlert}
              onChange={handleChangeName}
              placeholder="이름"
            />
            <SInput
              onClick={handleClickAlert}
              onChange={handleChangeNickname}
              placeholder="닉네임"
            />
            <SInput onChange={handleChangeEmail} placeholder="이메일" />
            <SInput
              type="password"
              onChange={handleChangePassword}
              placeholder="비밀번호"
            />
          </div>
          <STermSection>
            <STerm>
              <div>
                <input
                  type="checkbox"
                  name="term"
                  value="service"
                  onClick={handleClickTermService}
                />
                서비스 이용약관
              </div>
              <div>
                <input
                  type="checkbox"
                  name="term"
                  value="location"
                  onClick={handleClickTermLocation}
                />
                위치 기반 서비스
              </div>
            </STerm>
          </STermSection>
          <SSubmitBtn
            type="submit"
            disabled={!isAllValid}
            onClick={handleSubmit}
          >
            회원가입
          </SSubmitBtn>
        </SFormSection>
        <SLoginInfo>
          <div>
            <p>다나아의 회원이신가요?</p>
            <SLoginBtn>
              <Link to="/login">로그인</Link>
            </SLoginBtn>
          </div>
          <div>
            <p>의료인이시라면 </p>
            <SLoginBtn>
              <Link to="/medicalprovider">의료인 회원가입</Link>
            </SLoginBtn>
          </div>
        </SLoginInfo>
      </SLayout>
    </SMain>
  );
};

export default Signup;
