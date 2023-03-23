import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
import { Modal } from 'antd';

import TextEditor from '../../Components/AskForm/TextEditor';
import {
  SAskQuestionContainer,
  SAskQuestionBlock,
  STitle,
  SAskQuestionInfoBlock,
  SValidFail,
  SSubmitButton,
  SButtonBlock,
  SCancalButton,
} from '../../Style/AskQuestionStyle';
import AskQuestionTitle from '../../Components/AskForm/AskQuestionTitle';
import { locationData, typeData } from '../../Components/AskForm/PostData';
import LocationInput from '../../Components/AskForm/LocationInput';
import TypeInput from '../../Components/AskForm/TypeInput';

const AskQuestion = () => {
  const navigate = useNavigate();
  //로컬에 있는 토큰
  const token = localStorage.getItem('accessToken');
  // 제목 입력값
  const [questionTitle, setQuestionTitle] = useState('');
  // 제목 유효성 검사
  const [titleValid, setTitleValid] = useState(false);
  // 제목이 적합하지 않을 경우 표출되는 메시지
  const [titleMessage, setTitleMessage] = useState('');

  // 내용 입력값
  const [questionContent, setQuestionContent] = useState('');
  // 내용 유효성 검사
  const [textValid, setTextValid] = useState(false);
  // 내용이 적합하지 않을 경우 표출
  const [textMessage, setTextMessage] = useState('');

  // 지역 입력값
  const [location, setLocation] = useState(null);
  // 지역 유효성
  const [locationValid, setLocationValid] = useState(false);
  // 진료 과목 입력값
  const [medicalTagTitle, setMedicalTagTitle] = useState(null);
  // // 진료 과목 유효값
  const [medicalTagTitleValid, setMedicalTagTitleValid] = useState(false);
  // 지역,타입 유효성 실패 메시지
  const [validFailMessage, setValidFailMessage] = useState('');
  // 입력값 총 합
  const [questionData, setQuestionData] = useState({});
  //제출하기 모달
  const [submitModal, setSubmitModal] = useState(false);

  //f로그인 상태정보
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const userInfo = useRecoilState(loggedUserInfo);

  useEffect(() => {
    // 로그인 상태가 아닐경우
    if (!isLogin) {
      alert('로그인을 해 주세요');
      navigate('/home');
    }
    // 전문가일 경우
    if (userInfo[0].doctor) {
      alert('죄송합니다.전문가는 작성하실 수 없습니다.');
      navigate('/home');
    }
  }, [setIsLogin]);

  //데이터가 변경될때마다 종합에 넣어줌
  useEffect(() => {
    setQuestionData({
      title: questionTitle,
      regionName: location,
      content: questionContent,
      medicalTagTitle,
    });
  }, [questionTitle, location, questionContent, medicalTagTitle]);

  // 작성 내용
  const handleText = (value) => {
    setQuestionContent(value);
    if (value.length < 5) {
      setTextValid(false);
      setTextMessage('내용은 5글자 이상 입력해주세요');
    } else if (value.length > 500) {
      setTextValid(false);
      setTextMessage('내용은 500글자 이하로 입력해주세요');
    } else {
      setTextValid(true);
    }
    setQuestionContent(value);
  };

  //제목 받아오기
  const titleOnChangeHandler = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length < 5) {
      setTitleValid(false);
      setTitleMessage('제목은 5글자 이상 입력해주세요');
    } else if (inputTitle.length > 25) {
      setTitleValid(false);
      setTitleMessage('제목은 25글자 이하로 입력해주세요');
    } else {
      setTitleValid(true);
    }

    setQuestionTitle(inputTitle);
  };

  // 지역 받아오기
  const locationChangeHandler = (e) => {
    setLocation(e);
    setLocationValid(true);
  };

  //진료 과목 받아오기
  const typeChangeHandler = (e) => {
    setMedicalTagTitle(e);
    setMedicalTagTitleValid(true);
  };

  //받아온 데이터 받아온걸 종합하기
  const submitDataHandler = () => {
    axios
      .post('/posts', questionData, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
      });

    alert('질문이 작성되었습니다.');
    navigate('/home');
  };

  // 제출하기 모달 관리
  const showSubmitModal = () => {
    if (location === '' || !location) {
      setLocationValid(false);
      setValidFailMessage('내용을 입력해 주세요');
    }

    if (medicalTagTitle === '' || !medicalTagTitle) {
      setMedicalTagTitleValid(false);
      setValidFailMessage('내용을 입력해 주세요');
    }

    if (questionTitle.length < 5) {
      setTitleMessage('제목은 5글자 이상 입력해주세요');
      setTitleValid(false);
    }
    if (questionContent.length < 5) {
      setTextValid(false);
      setTextMessage('내용은 5글자 이상 입력해주세요');
    }
    if (locationValid && medicalTagTitleValid && titleMessage && textValid) {
      setSubmitModal(true);
    }
  };
  const submitHandleCancel = () => {
    setSubmitModal(false);
  };

  return (
    <SAskQuestionContainer>
      <Modal
        title="다나아"
        open={submitModal}
        onOk={submitDataHandler}
        onCancel={submitHandleCancel}
      >
        <p>질문을 작성하시겠습니까??</p>
      </Modal>
      <SAskQuestionBlock>
        <STitle>질문 작성하기</STitle>
        <span>제목</span>
        <AskQuestionTitle
          title={questionTitle}
          titleOnChangeHandler={titleOnChangeHandler}
        />
        <SValidFail> {titleValid ? null : titleMessage}</SValidFail>
        <SAskQuestionInfoBlock>
          <div>
            <span>지역</span>
            <LocationInput
              treeData={locationData}
              value={location}
              locationChangeHandler={locationChangeHandler}
            />
            <SValidFail> {locationValid ? null : validFailMessage}</SValidFail>
          </div>
          <div>
            <span>진료과목</span>
            <TypeInput
              treeData={typeData}
              value={medicalTagTitle}
              typeChangeHandler={typeChangeHandler}
            />
            <SValidFail>
              {medicalTagTitleValid ? null : validFailMessage}
            </SValidFail>
          </div>
        </SAskQuestionInfoBlock>
        <TextEditor handleText={handleText} value={questionContent} />
        <SValidFail> {textValid ? null : textMessage}</SValidFail>
        <SButtonBlock>
          <SCancalButton>취소</SCancalButton>
          <SSubmitButton onClick={showSubmitModal}>작성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
    </SAskQuestionContainer>
  );
};

export default AskQuestion;
