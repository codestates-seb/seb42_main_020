import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
// import { useNavigate } from 'react-router-dom';
import CommentForm from '../../Components/CommentForm/CommentForm';
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
  // 로그인 상태 정보 확인
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [loginInfo, setLoginInfo] = useRecoilState(loggedUserInfo);

  // 좋아요 상태관리
  const [like, setLike] = useState(false);
  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(true);
  // 받아오는 정보 관리
  const [reviewData, setReviewData] = useState({});
  // 작성자 정보 관리
  const [reviewFrom, setReviewFrom] = useState({});

  // 로그인 정보를 확인
  useEffect(() => {
    console.log(loginInfo);
    console.log(setLoginInfo);
    if (!isLogin) {
      alert('로그인을 해 주세요');
      navigate('/home');
    }
  }, [setIsLogin]);

  useEffect(() => {
    axios
      .get('/posts/1', {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => {
        console.log(res.data);
        setReviewData(res.data);
        setReviewFrom(res.data.writerResponse);
      });
  }, []);

  // 버튼 클릭시 좋아요 넣기
  const likeHandler = () => {
    setLike((prev) => !prev);
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
      <SReviewDetailBlock>
        <SReviewHeader className="review-header">
          <img src="/images/Swear.png" alt="사진" />
          <SReviewUserInfo className="review-info">
            <span>{reviewFrom.displayName}</span>
            <span>{reviewData.modifiedAt}</span>
          </SReviewUserInfo>
        </SReviewHeader>
        <SReviewHospitalInfo className="hopital-info">
          <span>{reviewData.medicalTagTitle}</span>
          {/* 추 후에 서버작업 완료되면 수정 예정 */}
          <span>⭐⭐⭐⭐⭐ (5.0) 점</span>
        </SReviewHospitalInfo>
        <SReviewContent className="contents">
          <p>{reviewData.content}~</p>
          <SReviewButtonBlock className="review-footer">
            <button onClick={likeHandler}>{like ? '❤️ 99' : '🖤'}</button>
            {loginInfo.memberId === reviewFrom.memberId ? (
              <></>
            ) : (
              <div className="review-button">
                <button onClick={reportModalHandler}>신 고</button>
              </div>
            )}
          </SReviewButtonBlock>
        </SReviewContent>
      </SReviewDetailBlock>
      <CommentForm></CommentForm>
    </SReviewDetailContainer>
  );
};

export default ReviewDetail;
