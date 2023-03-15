import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextEditor from '../../Components/AskForm/TextEditor';
import {
  SAskQuestionContainer,
  SAskQuestionBlock,
  STitle,
  SAskQuestionInfoBlock,
  SValidFail,
  SHospitalInfoBlock,
  SHospitalInfo,
  SStarRateBlock,
  SSubmitButton,
  SButtonBlock,
  SCancalButton,
} from '../../Style/AskQuestionStyle';
import AskQuestionTitle from '../../Components/AskForm/AskQuestionTitle';
import { locationData, typeData } from '../../Components/AskForm/QuestionData';
import LocationInput from '../../Components/AskForm/LocationInput';
import TypeInput from '../../Components/AskForm/TypeInput';
import HospitalInput from '../../Components/ReviewForm/HospitalInput';
import RateStar from '../../Components/ReviewForm/RateStar';
import ModalTest from '../../Components/MakeContents/MakeContents';
import WaitModal from '../../Components/ReviewForm/WaitModal';
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
  // 병원명 입력값
  const [hospitalName, setHospitalName] = useState('');
  // 병원명 유효성
  const [hospitalValid, setHospitalValid] = useState(false);
  // 병원명 입력 실패시 나타날 메시지
  const [hospitalMesasge, setHospitalMessage] = useState('');
  // 별점 입력값
  const [rateNumber, setRateNumber] = useState('');
  // 별점 입력 유효성
  const [rateValid, setRateValid] = useState(false);
  // 별점 입력 실패시 나타날 메시지
  const [rateMessage, setRateMesasge] = useState();
  // 종합적인 리뷰 데이터
  const [reviewData, setReviewData] = useState({});
  // 리뷰 대기 안내창
  const [reviewWait, setReviewWait] = useState(false);

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

  // 병원명 받아오기
  const hospitalChangeHandler = (e) => {
    console.log(e);
    setHospitalName(e.target.value);
    setHospitalValid(true);
  };

  //별점 데이터 받아오기
  const rateNumberHandler = (e) => {
    setRateValid(true);
    setRateNumber(e);
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

    if (hospitalName === '') {
      setHospitalValid(false);
      setHospitalMessage('병원명을 입력해 주세요');
    }

    if (!rateValid) {
      setRateMesasge('별점을 선택해 주세요');
    }
    // 모든 입력이 정상적으로 되었을 경우
    if (
      reviewValid &&
      reviewTitleValid &&
      reviewLocationValid &&
      reviewTypeValid &&
      rateValid
    ) {
      // 사용자의 입력 데이터를 종합
      setReviewData({
        reviewTitle,
        reviewLocation,
        reviewType,
        reviewText,
        rateNumber,
      });
      // 승인 대기중 모달창 노출
      setReviewWait(true);
      // navigate('/');
      //나중에 서버로 데이터 보내줄 예정
      console.log(reviewData);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setReviewWait(false);
  };

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
        <SHospitalInfoBlock>
          <SHospitalInfo>
            <span>병원명</span>
            <HospitalInput
              hospitalName={hospitalName}
              hospitalChangeHandler={hospitalChangeHandler}
            />
            <SValidFail>{hospitalValid ? null : hospitalMesasge}</SValidFail>
          </SHospitalInfo>
          <SHospitalInfo>
            <div>
              <span>평점</span>
              <span className="input_info">
                별을 클릭해서 병원의 만족도를 알려주세요!!
              </span>
            </div>
            <SStarRateBlock>
              <RateStar
                rateNumber={rateNumber}
                rateNumberHandler={rateNumberHandler}
              />
              <span>({rateNumber})</span>
            </SStarRateBlock>
            <SValidFail>{rateValid ? null : rateMessage}</SValidFail>
          </SHospitalInfo>
        </SHospitalInfoBlock>
        <TextEditor handleText={handleText} />
        <SValidFail> {reviewValid ? null : reviewMessage}</SValidFail>
        <div>
          <label htmlFor="pics">영수증 사진</label>
          <input
            id="pics"
            type="file"
            placeholder="영수증 사진을 업로드 해주세요"
          />
        </div>
        <SButtonBlock>
          <SCancalButton>취 소</SCancalButton>
          <SSubmitButton onClick={submitDataHandler}>작 성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
      <ModalTest />
      {reviewWait && <WaitModal closeModal={closeModal} />}
    </SAskQuestionContainer>
  );
};

export default Review;
