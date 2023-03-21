import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
// import { useNavigate } from 'react-router-dom';
import ReportModal from '../../Components/ReportModal/ReportModal';
import HospitalLocation from '../../Components/HospitalLocation/HospitalLocation';
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
  const token = localStorage.getItem('accessToken');

  // 로그인 상태 정보 확인
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [loginInfo, setLoginInfo] = useRecoilState(loggedUserInfo);

  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(true);
  // 받아오는 정보 관리
  const [reviewData, setReviewData] = useState({});
  // 작성자 정보 관리
  const [reviewFrom, setReviewFrom] = useState({});

  // 로그인 정보를 확인
  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해 주세요');
      navigate('/home');
    }
  }, [setIsLogin, setLoginInfo]);

  //상세 경로 수정 예쩡
  useEffect(() => {
    axios
      .get('/posts/3', {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log('응답');
        console.log(res.data);
        setReviewData(res.data);

        setReviewFrom(res.data.writerResponse);
      });
  }, [setReviewData]);

  // 버튼 클릭시 좋아요 넣기
  const likeHandler = () => {
    axios({
      method: 'post',
      url: `/posts/${reviewData?.postId}/likes`,
      headers: { Authorization: token },
    }).then((res) => {
      location.reload();
      console.log(res);
    });
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
          reviewData={reviewData}
        />
      )}
      <SReviewDetailBlock>
        <SReviewHeader className="review-header">
          <img src="/images/Swear.png" alt="사진" />
          <SReviewUserInfo className="review-info">
            <span>{reviewFrom?.displayName}</span>
            <span>{reviewData?.modifiedAt.replace('T', ' ').slice(0, -7)}</span>
          </SReviewUserInfo>
        </SReviewHeader>
        <SReviewHospitalInfo className="hopital-info">
          <span>{reviewData?.hospitalName}</span>
          {/* 추 후에 서버작업 완료되면 수정 예정 */}
          <span>⭐⭐⭐⭐⭐ ({reviewData?.starRating}) 점</span>
        </SReviewHospitalInfo>
        <SReviewContent className="contents">
          <p>{reviewData.content?.slice(3, -4)}~</p>
          <SReviewButtonBlock className="review-footer">
            {loginInfo?.memberId === reviewFrom?.memberId ? (
              <></>
            ) : (
              <>
                <button onClick={likeHandler}>
                  ❤️ {reviewData?.totalLike}
                </button>
                <div className="review-button">
                  <button onClick={reportModalHandler}>신 고</button>
                </div>
              </>
            )}
          </SReviewButtonBlock>
        </SReviewContent>
      </SReviewDetailBlock>
      <HospitalLocation reviewData={reviewData} />
    </SReviewDetailContainer>
  );
};

export default ReviewDetail;
