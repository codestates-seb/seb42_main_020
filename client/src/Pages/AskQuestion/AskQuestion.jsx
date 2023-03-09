import { useState } from 'react';
import TextEditor from '../../Components/AskForm/TextEditor';
import { Input } from 'antd';
import {
  SAskQuestionContainer,
  SAskQuestionBlock,
  STitle,
  SAskQuestionInfoBlock,
  SSubmitButton,
  SButtonBlock,
  SCancalButton,
} from '../../Style/AskQuestion';
import TextInput from '../../Components/AskForm/TextInput';

const treeData = [
  {
    value: '강남구',
    title: '강남구',
  },
  {
    value: '강서구',
    title: '강서구',
  },
  {
    value: '중구',
    title: '중구',
  },
  {
    value: '서초구',
    title: '서초구',
  },
  {
    value: '양천구',
    title: '양천구',
  },
  {
    value: '종로구',
    title: '종로구',
  },
  {
    value: '송파구',
    title: '송파구',
  },
  {
    value: '마포구',
    title: '마포구',
  },
  {
    value: '용산구',
    title: '용산구',
  },
  {
    value: '강동구',
    title: '강동구',
  },
  {
    value: '서대문구',
    title: '서대문구',
  },
  {
    value: '성동구',
    title: '성동구',
  },
  {
    value: '관악구',
    title: '관악구',
  },
  {
    value: '은평구',
    title: '은평구',
  },
  {
    value: '동대문구',
    title: '동대문구',
  },
  {
    value: '동작구',
    title: '동작구',
  },
  {
    value: '노원구',
    title: '노원구',
  },
  {
    value: '도봉구',
    title: '도봉구',
  },
  {
    value: '영등포구',
    title: '영등포구',
  },
  {
    value: '중랑구',
    title: '중랑구',
  },
  {
    value: '강북구',
    title: '강북구',
  },
  {
    value: '금천구',
    title: '금천구',
  },
  {
    value: '광진구',
    title: '광진구',
  },
  {
    value: '성북구',
    title: '성북구',
  },
  {
    value: '구로구',
    title: '구로구',
  },
];

const typeData = [
  {
    value: '치과',
    title: '치과',
  },
  {
    value: '안과',
    title: '안과',
  },
  {
    value: '피부과',
    title: '피부과',
  },
  {
    value: '성형외과',
    title: '성형외과',
  },
  {
    value: '산부인과',
    title: '산부인과',
  },
  {
    value: '정신건강의학과',
    title: '정신건강의학과',
  },
  {
    value: '비뇨기과',
    title: '비뇨기과',
  },
  {
    value: '정형외과',
    title: '정형외과',
  },
  {
    value: '마취통증의학과',
    title: '마취통증의학과',
  },
  {
    value: '신경외과',
    title: '신경외과',
  },
  {
    value: '재활의학과',
    title: '재활의학과',
  },
  {
    value: '영상의학과',
    title: '영상의학과',
  },
  {
    value: '외과',
    title: '외과',
  },
  {
    value: '신경과',
    title: '신경과',
  },
  {
    value: '소아과',
    title: '소아과',
  },
  {
    value: '내과',
    title: '내과',
  },
  {
    value: '이빈후과',
    title: '이빈후과',
  },
  {
    value: '가정의학과',
    title: '가정의학과',
  },
  {
    value: '한의원',
    title: '한의원',
  },
  {
    value: '기타',
    title: '기타',
  },
];

const InputTitle = () => <Input placeholder="제목을 입력해 주세요" />;

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleText = (value) => {
    setText(value);
  };

  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <SAskQuestionContainer>
      <SAskQuestionBlock>
        <STitle>질문 작성하기</STitle>
        <span>제목</span>
        <InputTitle value={title} onChange={titleOnChangeHandler} />
        <SAskQuestionInfoBlock>
          <div>
            <span>지역</span>
            <TextInput treeData={treeData} />
          </div>
          <div>
            <span>진료과목</span>
            <TextInput treeData={typeData} />
          </div>
        </SAskQuestionInfoBlock>
        <TextEditor text={text} handleText={handleText} />
        <SButtonBlock>
          <SCancalButton>취소</SCancalButton>
          <SSubmitButton>작성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
    </SAskQuestionContainer>
  );
};

export default AskQuestion;
