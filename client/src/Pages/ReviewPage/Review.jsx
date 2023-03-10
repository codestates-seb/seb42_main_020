import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextEditor from '../../Components/AskForm/TextEditor';
import {
  SAskQuestionContainer,
  SAskQuestionBlock,
  STitle,
  SAskQuestionInfoBlock,
  SRateStartBlock,
  SValidFail,
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
  // 제목 입력값
  const [reviewTitle, setReviewTitle] = useState('');
  // 제목 유효성 검사
  const [reviewTitleValid, setReviewTitleValid] = useState(false);
  // 제목이 적합하지 않을 경우 표출
  const [reviewTitleMessage, setReviewTitleMessage] = useState('');
  // 내용 입력값
  const [reviewText, setReviewText] = useState('');
  // 내용 유효성 검사
  const [reviewValid, setReviewValid] = useState(false);
  //  내용이 적합하지 않을 경우 메시지
  const [reviewMessage, setReviewMessage] = useState('');
  // 지역 입력값
  const [reviewLocation, setReviewLocation] = useState('');
  // 지역 유효성
  const [reviewLocationValid, setReviewLocationValid] = useState(false);
  // 진료 과목 입력값
  const [reviewType, setReviewType] = useState('');
  // 진료 과목 유효성
  const [reviewTypeValid, setReviewTypeValid] = useState(false);
  // 지역 or 진료 과목이 실패할 경우 메시지
  const [reviewFailMessage, setReviewFailMessage] = useState('');
  // 별점 입력값
  const [rateNumber, setRateNumber] = useState('');
  // 별점 입력 유효성
  const [rateValid, setRateValid] = useState(false);
  // 별점 입력 실패시 나타날 메시지
  const [rateMessage, setRateMesasge] = useState();
  // 종합적인 리뷰 데이터
  const [reviewData, setReviewData] = useState({});

  // 작성 내용
  const handleText = (value) => {
    if (value.length < 5) {
      setReviewValid(false);
      setReviewMessage('내용은 5글자 이상 입력해주세요');
    } else if (value.length > 100) {
      setReviewValid(false);
      setReviewMessage('내용은 100글자 이하로 입력해주세요');
    } else {
      setReviewValid(true);
    }

    setReviewText(value);
  };
  //제목 받아오기
  const titleOnChangeHandler = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length < 5) {
      setReviewTitleValid(false);
      setReviewTitleMessage('제목은 5글자 이상 입력해주세요');
    } else if (inputTitle.length > 25) {
      setReviewTitleValid(false);
      setReviewTitleMessage('제목은 25글자 이하로 입력해주세요');
    } else {
      setReviewTitleValid(true);
    }

    setReviewTitle(inputTitle);
  };

  // 지역 받아오기
  const locationChangeHandler = (e) => {
    setReviewLocation(e);
    setReviewLocationValid(true);
  };

  //진료 과목 받아오기
  const typeChangeHandler = (e) => {
    setReviewType(e);
    setReviewTypeValid(true);
  };

  //받아온 데이터 받아온걸 종합하기
  const submitDataHandler = () => {
    if (location === '') {
      setReviewLocationValid(false);
      setReviewFailMessage('내용을 입력해 주세요');
    }

    if (reviewType === '') {
      setReviewTypeValid(false);
      setReviewFailMessage('내용을 입력해 주세요');
    }

    if (reviewTitle.length < 5) {
      setReviewTitleValid(false);
      setReviewTitleMessage('제목은 5글자 이상 입력해주세요');
    }

    if (reviewText < 5) {
      setReviewValid(false);
      setReviewMessage('내용은 5글자 이상 입력해주세요');
    }

    if (!rateValid) {
      setRateMesasge('별점을 선택해 주세요');
    }

    setReviewData({
      reviewTitle,
      reviewLocation,
      reviewType,
      reviewText,
      rateNumber,
    });
    // navigate('/');
    //나중에 서버로 데이터 보내줄 예정
    console.log(setReviewData);
  };

  //별점 데이터 받아오기
  const rateNumberHandler = (e) => {
    setRateValid(true);
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
        <SValidFail> {reviewTitleValid ? null : reviewTitleMessage}</SValidFail>
        <SAskQuestionInfoBlock>
          <div>
            <span>지역</span>
            <LocationInput
              treeData={locationData}
              location={reviewLocation}
              locationChangeHandler={locationChangeHandler}
            />
            <SValidFail>
              {reviewLocationValid ? null : reviewFailMessage}
            </SValidFail>
          </div>
          <div>
            <span>진료 과목</span>
            <TypeInput
              treeData={typeData}
              type={reviewType}
              typeChangeHandler={typeChangeHandler}
              reviewTypeValid
            />
            <SValidFail>
              {reviewTypeValid ? null : reviewFailMessage}
            </SValidFail>
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
        <SValidFail>{rateValid ? null : rateMessage}</SValidFail>
        <TextEditor handleText={handleText} />
        <SValidFail> {reviewValid ? null : reviewMessage}</SValidFail>
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
