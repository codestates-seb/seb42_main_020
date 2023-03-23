import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
import ReportModal from '../../Components/ReportModal/ReportModal';
import { Modal, notification, Space } from 'antd';
import { FaHeart } from 'react-icons/fa';
// import HospitalLocation from '../../Components/HospitalLocation/HospitalLocation';
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
  const { postId } = useParams();

  // 로그인 상태 정보 확인
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const userInfo = useRecoilState(loggedUserInfo);

  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(true);
  // 받아오는 정보 관리
  const [reviewData, setReviewData] = useState({});
  // 작성자 정보 관리
  const [reviewFrom, setReviewFrom] = useState({});
  // 좋아요 알람 다루기
  const [likeModal, setLikeModal] = useState(false);
  // 알림창 관리
  const [api, contextHolder] = notification.useNotification();

  // 로그인 정보를 확인
  useEffect(() => {
    if (!isLogin) {
      Modal.warning({
        title: '다나아',
        content: '로그인을 해주세요!',
        onOk() {
          navigate('/home');
        },
      });
    }
  }, [setIsLogin]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/posts/${postId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
        Authorization: `${token}`,
      },
    }).then((res) => {
      console.log('응답');
      console.log(res.data);
      setReviewData(res.data);
      setReviewFrom(res.data.writerResponse);
    });
  }, [setReviewData]);

  // 버튼 클릭시 좋아요 넣기
  const likeHandler = () => {
    // 게시글 작성자와 현재 유저가 같으면 작동 X
    if (reviewFrom?.memberId === userInfo[0]?.memberId) {
      setLikeModal(false);
      return null;
    } else {
      axios({
        method: 'post',
        url: `/posts/${reviewData?.postId}/likes`,
        headers: { Authorization: token },
      })
        .then((res) => {
          location.reload();
          console.log(res);
        })
        .catch((error) => {
          api.info({
            message: `다나아`,
            description: '좋아요는 한 게시물에 한번만 가능합니다!',
            placement: 'top',
          });
          console.log(error);
        });
    }
  };

  // 좋아요 모달 관리
  const showLikeModal = () => {
    setLikeModal(true);
  };
  const likeHandleCancel = () => {
    setLikeModal(false);
  };

  // 신고 모달창 관리하기
  const reportModalHandler = () => {
    setReportModal((prev) => !prev);
  };

  return (
    <SReviewDetailContainer>
      {contextHolder}
      <Space wrap></Space>
      <Modal
        title="다나아"
        open={likeModal}
        onOk={likeHandler}
        onCancel={likeHandleCancel}
      >
        <p>해당 리뷰가 맘에 드시나요???</p>
      </Modal>
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
            <span>
              {reviewData?.modifiedAt?.replace('T', ' ').slice(0, -7)}
            </span>
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
            {userInfo[0]?.memberId === reviewFrom?.memberId ? (
              <button>
                <FaHeart /> {reviewData?.totalLike}
              </button>
            ) : (
              <>
                <button onClick={showLikeModal}>
                  <FaHeart /> {reviewData?.totalLike}
                </button>
                <div className="review-button">
                  <button onClick={reportModalHandler}>신 고</button>
                </div>
              </>
            )}
          </SReviewButtonBlock>
        </SReviewContent>
      </SReviewDetailBlock>
      {/* <HospitalLocation reviewData={reviewData} /> */}
    </SReviewDetailContainer>
  );
};

export default ReviewDetail;
