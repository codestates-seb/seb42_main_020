import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../../Components/AskForm/TextEditor';
import { Modal, Space } from 'antd';

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
  SImgBlock,
  SInputImg,
} from '../../Style/AskQuestionStyle';
import AskQuestionTitle from '../../Components/AskForm/AskQuestionTitle';
import { locationData, typeData } from '../../Components/AskForm/PostData';
import LocationInput from '../../Components/AskForm/LocationInput';
import TypeInput from '../../Components/AskForm/TypeInput';
import HospitalInput from '../../Components/ReviewForm/HospitalInput';
import RateStar from '../../Components/ReviewForm/RateStar';

const Review = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  // 로그인 상태
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const userInfo = useRecoilState(loggedUserInfo);
  // 제목 입력값
  const [reviewTitle, setReviewTitle] = useState('');
  // 제목 유효성 검사
  const [reviewTitleValid, setReviewTitleValid] = useState(false);
  // 제목이 적합하지 않을 경우 표출
  const [titleFailMessage, setTitleFailMessage] = useState('');
  // 내용 입력값
  const [reviewContent, setReviewContent] = useState('');
  // 내용 유효성 검사
  const [reviewContentValid, setReviewContentValid] = useState(false);
  //  내용이 적합하지 않을 경우 메시지
  const [contentFailMessage, setContentFailMessage] = useState('');
  // 지역 입력값
  const [reviewRegionName, setReviewRegionName] = useState(null);
  // 지역 유효성
  const [reviewRegionNameValid, setReviewRegionNameValid] = useState(false);
  // 진료 과목 입력값
  const [medicalTagTitle, setMedicalTagTitle] = useState(null);
  // 진료 과목 유효성
  const [medicalTagTitleValid, setMedicalTagTitleValid] = useState(false);
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
  // 사진
  const [recipte, setRecipte] = useState(null);
  // 사진 유효성
  const [recipteValid, setRecipteValid] = useState(false);
  // 사진 유효성 실패시 메시지
  const [recipteMessage, setRecipteMessage] = useState('');
  // 제출 승인 대기 모달 표시
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    // 로그인 상태가 아닐경우
    if (!isLogin) {
      Modal.warning({
        title: '다나아',
        content: '로그인을 해주세요!',
        onOk() {
          navigate('/home');
        },
      });
    }
    // 전문가일 경우
    if (userInfo[0]?.doctor) {
      Modal.warning({
        title: '다나아',
        content: '죄송합니다! 전문가는 리뷰를 등록하실 수 없습니다',
        onOk() {
          navigate('/home');
        },
      });
    }
  }, [setIsLogin]);

  //리뷰 데이터 종합하기
  useEffect(() => {
    setReviewData({
      title: reviewTitle,
      regionName: reviewRegionName,
      content: reviewContent,
      medicalTagTitle,
      hospitalName,
      starRating: rateNumber,
    });
  }, [
    reviewTitle,
    reviewRegionName,
    reviewContent,
    medicalTagTitle,
    hospitalName,
    rateNumber,
  ]);

  // 작성 내용
  const handleText = (value) => {
    if (value.length < 5) {
      setReviewContentValid(false);
      setContentFailMessage('내용은 5글자 이상 입력해주세요');
    } else if (value.length > 500) {
      setReviewContentValid(false);
      setContentFailMessage('내용은 500글자 이하로 입력해주세요');
    } else {
      setReviewContentValid(true);
    }

    setReviewContent(value);
  };

  //제목 받아오기
  const titleOnChangeHandler = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length < 5) {
      setReviewTitleValid(false);
      setTitleFailMessage('제목은 5글자 이상 입력해주세요');
    } else if (inputTitle.length > 25) {
      setReviewTitleValid(false);
      setTitleFailMessage('제목은 25글자 이하로 입력해주세요');
    } else {
      setReviewTitleValid(true);
    }

    setReviewTitle(inputTitle);
  };

  // 지역 받아오기
  const locationChangeHandler = (e) => {
    setReviewRegionName(e);
    setReviewRegionNameValid(true);
  };

  //진료 과목 받아오기
  const typeChangeHandler = (e) => {
    setMedicalTagTitle(e);
    setMedicalTagTitleValid(true);
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

  // 사진 받아오기
  const recipteHandler = (e) => {
    const uploadFile = e.target.files[0];
    setRecipteValid(true);
    setRecipte(uploadFile);
  };

  //받아온 데이터 받아온걸 종합하기
  const submitDataHandler = () => {
    if (reviewRegionName === '' || !reviewRegionName) {
      setReviewRegionNameValid(false);
      setReviewFailMessage('내용을 입력해 주세요');
    }

    if (medicalTagTitle === '' || !medicalTagTitle) {
      setMedicalTagTitleValid(false);
      setReviewFailMessage('내용을 입력해 주세요');
    }

    if (reviewTitle.length < 5) {
      setReviewTitleValid(false);
      setTitleFailMessage('제목은 5글자 이상 입력해주세요');
    }

    if (reviewContent < 5) {
      setReviewContentValid(false);
      setContentFailMessage('내용은 5글자 이상 입력해주세요');
    }

    if (hospitalName === '') {
      setHospitalValid(false);
      setHospitalMessage('병원명을 입력해 주세요');
    }

    if (!rateValid) {
      setRateMesasge('별점을 선택해 주세요');
    }

    if (!recipteValid) {
      setRecipteMessage('사진을 넣주세요');
    }
    // 모든 입력이 정상적으로 되었을 경우
    if (
      reviewContentValid &&
      reviewTitleValid &&
      reviewRegionNameValid &&
      medicalTagTitleValid &&
      rateValid &&
      recipteValid
    ) {
      // 사진과 텍스트를 같이 보내기 위해서 formdata 사용
      const formData = new FormData();

      // formData에 이미지 파일 넣기
      formData.append('img', recipte);

      // formDarta에 텍스트 파일들 넣기
      // 서버와는 json으로 통신하기때문에 blob을 이용하여 파일을 보낸다
      formData.append(
        'post',
        new Blob([JSON.stringify(reviewData)], { type: 'application/json' })
      );

      axios
        .post('/reviews', formData, {
          //이미지와 json파일이 가기때문에
          headers: {
            'Content-Type': 'multipart/form-data', // token 추가로 넣어주기
            Authorization: token, // RequestPart 에너테이션 사용으로 토큰 필요
          },
        })
        .then((res) => {
          console.log(res);
        });

      // 승인 대기중 모달창 노출
      setIsPostModalOpen(true);
    }
  };

  // const showModal = () => {
  //   setIsPostModalOpen(true);
  // };
  const handleOk = () => {
    setIsPostModalOpen(false);
    navigate('/home');
  };
  const handleCancel = () => {
    setIsPostModalOpen(false);
  };

  console.log(reviewData);

  return (
    <SAskQuestionContainer>
      <Space wrap></Space>
      <SAskQuestionBlock>
        <STitle>리뷰 작성하기</STitle>
        <span>제목</span>
        <AskQuestionTitle
          title={reviewTitle}
          titleOnChangeHandler={titleOnChangeHandler}
        />
        <SValidFail> {reviewTitleValid ? null : titleFailMessage}</SValidFail>

        <SAskQuestionInfoBlock>
          <div>
            <span>지역</span>
            <LocationInput
              treeData={locationData}
              value={reviewRegionName}
              locationChangeHandler={locationChangeHandler}
            />
            <SValidFail>
              {reviewRegionNameValid ? null : reviewFailMessage}
            </SValidFail>
          </div>
          <div>
            <span>진료 과목</span>
            <TypeInput
              treeData={typeData}
              value={medicalTagTitle}
              typeChangeHandler={typeChangeHandler}
              medicalTagTitleValid
            />
            <SValidFail>
              {medicalTagTitleValid ? null : reviewFailMessage}
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
        <TextEditor handleText={handleText} value={reviewContent} />
        <SValidFail>
          {reviewContentValid ? null : contentFailMessage}
        </SValidFail>
        <SImgBlock className="imgBlock">
          <label htmlFor="pics">영수증 사진</label>
          <SInputImg
            id="pics"
            type="file"
            accept="image/png, image/jpeg"
            placeholder="영수증 사진을 업로드 해주세요"
            onChange={recipteHandler}
          />
        </SImgBlock>
        <SValidFail>{recipteValid ? null : recipteMessage}</SValidFail>
        <SButtonBlock>
          <SCancalButton>취 소</SCancalButton>
          <SSubmitButton onClick={submitDataHandler}>작 성</SSubmitButton>
        </SButtonBlock>
      </SAskQuestionBlock>
      <Modal
        title="다나아"
        open={isPostModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>리뷰가 정상적으로 등록되었습니다.</p>
        <p>등록된 리뷰는 관리자 승인 후 공개됩니다.</p>
      </Modal>
    </SAskQuestionContainer>
  );
};

export default Review;
