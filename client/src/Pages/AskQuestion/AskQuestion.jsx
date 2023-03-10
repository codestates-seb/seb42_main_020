import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextEditor from '../../Components/AskForm/TextEditor';
import {
  SAskQuestionContainer,
  SAskQuestionBlock,
  STitle,
  SAskQuestionInfoBlock,
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
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [userInputData, setUserInputData] = useState({});

  // 작성 내용
  const handleText = (value) => {
    setText(value);
  };
  //제목 받아오기
  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  // 지역 받아오기
  const locationChangeHandler = (e) => {
    setLocation(e);
  };

  //진료 과목 받아오기
  const typeChangeHandler = (e) => {
    setType(e);
  };

  //받아온 데이터 받아온걸 종합하기
  const submitDataHandler = () => {
    setUserInputData({
      title,
      location,
      type,
      text,
    });
    // navigate('/');
  };

  console.log(userInputData);

  return (
    <SAskQuestionContainer>
      <SAskQuestionBlock>
        <STitle>질문 작성하기</STitle>
        <span>제목</span>
        <AskQuestionTitle
          title={title}
          titleOnChangeHandler={titleOnChangeHandler}
        />
        <SAskQuestionInfoBlock>
          <div>
            <span>지역</span>
            <LocationInput
              treeData={locationData}
              location={location}
              locationChangeHandler={locationChangeHandler}
            />
          </div>
          <div>
            <span>진료과목</span>
            <TypeInput
              treeData={typeData}
              type={type}
              typeChangeHandler={typeChangeHandler}
            />
          </div>
        </SAskQuestionInfoBlock>
        <TextEditor text={text} handleText={handleText} />
        <SButtonBlock>
          <SCancalButton>취소</SCancalButton>
          <SSubmitButton onClick={submitDataHandler}>작성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
    </SAskQuestionContainer>
  );
};

export default AskQuestion;
