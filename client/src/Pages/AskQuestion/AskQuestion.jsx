import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
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
import { locationData, typeData } from '../../Components/AskForm/QuestionData';
import LocationInput from '../../Components/AskForm/LocationInput';
import TypeInput from '../../Components/AskForm/TypeInput';

const AskQuestion = () => {
  // const navigate = useNavigate();
  // 제목 입력값
  const [title, setTitle] = useState('');
  // 제목이 적합하지 않을 경우 표출되는 메시지
  const [titleMessage, setTitleMessage] = useState('');
  // 제목 유효성 검사
  const [titleValid, setTitleValid] = useState(false);
  // 내용 입력값
  const [text, setText] = useState('');
  // 내용이 적합하지 않을 경우 표출
  const [textMessage, setTextMessage] = useState('');
  // 내용 유효성 검사
  const [textValid, setTextValid] = useState(false);
  // 지역 입력값
  const [location, setLocation] = useState('');
  // 지역 유효성
  const [locationValid, setLocationValid] = useState(false);
  // 지역,타입 유효성 실패 메시지
  const [validFailMessage, setValidFailMessage] = useState('');
  // 진료 과목 입력값
  const [type, setType] = useState('');
  // // 진료 과목 유효값
  const [typeValid, setTypeValid] = useState(false);
  // 입력값 총 합
  const [userInputData, setUserInputData] = useState({});

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

    setText(value);
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

    setTitle(inputTitle);
  };

  // 지역 받아오기
  const locationChangeHandler = (e) => {
    setLocation(e);
    setLocationValid(true);
  };

  //진료 과목 받아오기
  const typeChangeHandler = (e) => {
    setType(e);
    setTypeValid(true);
  };

  //받아온 데이터 받아온걸 종합하기
  const submitDataHandler = () => {
    if (location === '') {
      setLocationValid(false);
      setValidFailMessage('내용을 입력해 주세요');
    }

    if (type === '') {
      setTypeValid(false);
      setValidFailMessage('내용을 입력해 주세요');
    }

    if (title.length < 5) {
      setTitleMessage('제목은 5글자 이상 입력해주세요');
      setTitleValid(false);
    }

    setUserInputData({
      title,
      location,
      type,
      text,
    });
    // navigate('/');
    //나중에 서버로 데이터 보내줄 예정
    console.log(userInputData);
  };

  return (
    <SAskQuestionContainer>
      <SAskQuestionBlock>
        <STitle>질문 작성하기</STitle>
        <span>제목</span>
        <AskQuestionTitle
          title={title}
          titleOnChangeHandler={titleOnChangeHandler}
        />
        <SValidFail> {titleValid ? null : titleMessage}</SValidFail>
        <SAskQuestionInfoBlock>
          <div>
            <span>지역</span>
            <LocationInput
              treeData={locationData}
              location={location}
              locationChangeHandler={locationChangeHandler}
            />
            <SValidFail> {locationValid ? null : validFailMessage}</SValidFail>
          </div>
          <div>
            <span>진료과목</span>
            <TypeInput
              treeData={typeData}
              type={type}
              typeChangeHandler={typeChangeHandler}
            />
            <SValidFail>
              {typeValid === '' ? null : validFailMessage}
            </SValidFail>
          </div>
        </SAskQuestionInfoBlock>
        <TextEditor handleText={handleText} />
        <SValidFail> {textValid ? null : textMessage}</SValidFail>
        <SButtonBlock>
          <SCancalButton>취소</SCancalButton>
          <SSubmitButton onClick={submitDataHandler}>작성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
    </SAskQuestionContainer>
  );
};

export default AskQuestion;
