import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportModal from '../../Components/ReportModal/ReportModal';
import {
  SReviewDetailContainer,
  SReviewDetailBlock,
  SReviewHeader,
  SReviewUserInfo,
  SReviewHospitalInfo,
  SReviewContent,
  SReviewButtonBlock,
} from '../../Style/ReviewDetailStyle';

const ReviewDetail = () => {
  const navigate = useNavigate();
  // 유저 확인
  const [isWriteReview, setIsWriteReview] = useState(true);
  // 좋아요 상태관리
  const [like, setLike] = useState(false);
  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(true);

  // 로그인 관리(추후 삭제 예정)
  const loginHandler = () => {
    setIsWriteReview((prev) => !prev);
  };

  // 버튼 클릭시 좋아요 넣기
  const likeHandler = () => {
    setLike((prev) => !prev);
  };

  //삭제하기
  const deleteReviewHandler = () => {
    const deleteReview = confirm('리뷰를 삭제하시겠습니까?');
    if (deleteReview) {
      alert('리뷰가 삭제되었습니다.');
      navigate('/review');
    }
  };

  // 모달창 관리하기
  const reportModalHandler = () => {
    setReportModal((prev) => !prev);
  };

  return (
    <SReviewDetailContainer>
      {reportModal ? null : (
        <ReportModal
          reportModalHandler={reportModalHandler}
          setReportModal={setReportModal}
        />
      )}
      <button onClick={loginHandler}>로그인 관리</button>
      <SReviewDetailBlock>
        <SReviewHeader className="review-header">
          <img src="/images/Swear.png" alt="사진" />
          <SReviewUserInfo className="review-info">
            <span>ZI존승민</span>
            <span>2023-03-11 12:30</span>
          </SReviewUserInfo>
        </SReviewHeader>
        <SReviewHospitalInfo className="hopital-info">
          <span>승민병원</span>
          <span>⭐⭐⭐⭐⭐ (5.0) 점</span>
        </SReviewHospitalInfo>
        <SReviewContent className="contents">
          <p>리뷰내용입니다. 어쩌구 저쩌구 그래서 정말 좋았어요~</p>
          <SReviewButtonBlock className="review-footer">
            <button onClick={likeHandler}>{like ? '❤️ 99' : '🖤'}</button>
            {isWriteReview ? (
              <div className="review-button">
                <button onClick={deleteReviewHandler}>삭 제</button>
              </div>
            ) : (
              <div className="review-button">
                <button onClick={reportModalHandler}>신 고</button>
              </div>
            )}
          </SReviewButtonBlock>
        </SReviewContent>
      </SReviewDetailBlock>
    </SReviewDetailContainer>
  );
};

export default ReviewDetail;
