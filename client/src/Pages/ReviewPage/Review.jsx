import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextEditor from '../../Components/AskForm/TextEditor';
import {
  SAskQuestionContainer,
  SAskQuestionBlock,
  STitle,
  SAskQuestionInfoBlock,
  SRateStartBlock,
  SSubmitButton,
  SButtonBlock,
  SCancalButton,
} from '../../Style/AskQuestionStyle';
import AskQuestionTitle from '../../Components/AskForm/AskQuestionTitle';
import { locationData, typeData } from '../../Components/AskForm/QuestionData';
import LocationInput from '../../Components/AskForm/LocationInput';
import TypeInput from '../../Components/AskForm/TypeInput';
import RateStar from '../../Components/ReviewForm/RateStar';
import ModalTest from '../../Components/MakeContents/MakeContents';

const Review = () => {
  // const navigate = useNavigate();
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewType, setReviewType] = useState('');
  const [rateNumber, setRateNumber] = useState('');
  const [reviewData, setReviewData] = useState({});

  // 작성 내용
  const handleText = (value) => {
    setReviewText(value);
  };
  //제목 받아오기
  const titleOnChangeHandler = (e) => {
    setReviewTitle(e.target.value);
  };

  // 지역 받아오기
  const locationChangeHandler = (e) => {
    setReviewLocation(e);
  };

  //진료 과목 받아오기
  const typeChangeHandler = (e) => {
    setReviewType(e);
  };

  //받아온 데이터 받아온걸 종합하기
  const submitDataHandler = () => {
    setReviewData({
      reviewTitle,
      reviewLocation,
      reviewType,
      reviewText,
      rateNumber,
    });
    // navigate('/');
  };

  //별점 데이터 받아오기
  const rateNumberHandler = (e) => {
    setRateNumber(e);
  };

  console.log(reviewData);

  return (
    <SAskQuestionContainer>
      <SAskQuestionBlock>
        <STitle>리뷰 작성하기</STitle>
        <span>제목</span>
        <AskQuestionTitle
          title={reviewTitle}
          titleOnChangeHandler={titleOnChangeHandler}
        />
        <SAskQuestionInfoBlock>
          <div>
            <span>지역</span>
            <LocationInput
              treeData={locationData}
              location={reviewLocation}
              locationChangeHandler={locationChangeHandler}
            />
          </div>
          <div>
            <span>진료 과목</span>
            <TypeInput
              treeData={typeData}
              type={reviewType}
              typeChangeHandler={typeChangeHandler}
            />
          </div>
        </SAskQuestionInfoBlock>
        <SRateStartBlock>
          <span>평점</span>
          <RateStar
            rateNumber={rateNumber}
            rateNumberHandler={rateNumberHandler}
          />
          <span>별을 클릭해서 병원의 만족도를 알려주세요!!</span>
        </SRateStartBlock>
        <TextEditor text={reviewText} handleText={handleText} />
        <SButtonBlock>
          <SCancalButton>취 소</SCancalButton>
          <SSubmitButton onClick={submitDataHandler}>작 성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
      <ModalTest />
    </SAskQuestionContainer>
  );
};

export default Review;
