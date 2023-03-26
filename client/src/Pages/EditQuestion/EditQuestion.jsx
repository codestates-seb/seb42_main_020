import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Space } from 'antd';
import TextEditor from '../../Components/AskForm/TextEditor';
import { getAccessTokenFromLocal } from '../../util/Token';

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

const EditQuestion = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  //로컬에 있는 토큰
  const token = getAccessTokenFromLocal();
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
  const [location, setLocation] = useState('지역');
  // 지역 유효성
  const [locationValid, setLocationValid] = useState(false);
  // 진료 과목 입력값
  const [medicalTagTitle, setMedicalTagTitle] = useState('진료과목');
  // 진료 과목 유효값
  const [medicalTagTitleValid, setMedicalTagTitleValid] = useState(false);
  // 지역,타입 유효성 실패 메시지
  const [validFailMessage, setValidFailMessage] = useState('');
  // 입력값 총 합
  const [questionData, setQuestionData] = useState({});

  // 데이터 받아오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          'Content-Security-Policy': 'upgrade-insecure-requests',
          Authorization: token,
        },
      })
      .then((res) => {
        setQuestionTitle(res.data.title);
        setQuestionContent(res.data.content);
        setLocation(res.data.regionName);
        setMedicalTagTitle(res.data.medicalTagTitle);
      });
  }, []);

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
    if (value.length < 5) {
      setTextValid(false);
      setTextMessage('내용은 5글자 이상 입력해주세요');
    } else if (value.length > 100) {
      setTextValid(false);
      setTextMessage('내용은 100글자 이하로 입력해주세요');
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
    if (location === '') {
      setLocationValid(false);
      setValidFailMessage('내용을 입력해 주세요');
    }

    if (medicalTagTitle === '') {
      setMedicalTagTitleValid(false);
      setValidFailMessage('내용을 입력해 주세요');
    }

    if (questionTitle.length < 5) {
      setTitleMessage('제목은 5글자 이상 입력해주세요');
      setTitleValid(false);
    }

    axios
      .patch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, questionData, {
        headers: {
          Authorization: token,
          'Content-Security-Policy': 'upgrade-insecure-requests',
        },
      })
      .then(() => {});
    Modal.success({
      content: '질문이 수정되었습니다.',
      onOk() {
        navigate(`/home/question/${postId}`);
      },
    });
  };

  return (
    <SAskQuestionContainer>
      <Space wrap></Space>
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
              {medicalTagTitleValid === '' ? null : validFailMessage}
            </SValidFail>
          </div>
        </SAskQuestionInfoBlock>
        <TextEditor handleText={handleText} value={questionContent} />
        <SValidFail> {textValid ? null : textMessage}</SValidFail>
        <SButtonBlock>
          <SCancalButton>취소</SCancalButton>
          <SSubmitButton onClick={submitDataHandler}>작성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
    </SAskQuestionContainer>
  );
};

export default EditQuestion;
