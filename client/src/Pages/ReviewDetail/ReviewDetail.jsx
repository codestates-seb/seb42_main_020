import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
import ReportModal from '../../Components/ReportModal/ReportModal';
import { getAccessTokenFromLocal } from '../../util/Token';
import { Modal, notification, Space, Rate } from 'antd';
import { FaHeart } from 'react-icons/fa';
import HospitalLocation from '../../Components/HospitalLocation/HospitalLocation';
import {
  SReviewDetailContainer,
  SReviewDetailBlock,
  SReviewHeaderTitleBlock,
  SReviewInfoBlock,
  SReviewHospitalInfo,
  SReviewContent,
  SReviewButtonBlock,
} from '../../Style/ReviewDetailStyle';

const ReviewDetail = () => {
  const navigate = useNavigate();
  const token = getAccessTokenFromLocal();
  const { postId } = useParams();

  // 로그인 상태 정보 확인
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const userInfo = useRecoilState(loggedUserInfo);

  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(true);
  // 받아오는 정보 관리
  const [reviewData, setReviewData] = useState({});
  // 별점 관리
  const [stars, setStarts] = useState(null);
  // 작성자 정보 관리
  const [reviewFrom, setReviewFrom] = useState({});
  // 좋아요 알람 다루기
  const [likeModal, setLikeModal] = useState(false);
  // 알림창 관리
  const [api, contextHolder] = notification.useNotification();
  // 좋아요 누른거 확인
  const [isLike, seIsLike] = useState(false);
  // 서버에서 가져온 질문 내용
  const [content, setContent] = useState('');

  // 별점 관리
  const desc = ['1점', '2점', '3점', '4점', '5점'];

  // 로그인 정보를 확인
  useEffect(() => {
    if (!isLogin) {
      Modal.warning({
        title: '다나아',
        content: '로그인을 해주세요!',
        onOk() {
          navigate('/login');
        },
      });
    }
  }, [setIsLogin]);

  // 서버에서 데이터 받아오기
  useEffect(() => {
    axios({
      method: 'get',
      url: `/posts/${postId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
        'Content-Security-Policy': 'upgrade-insecure-requests',
        Authorization: token,
      },
    }).then((res) => {
      setReviewData(res.data);
      setReviewFrom(res.data.writerResponse);
      setStarts(res.data.starRating);
      setContent(res.data.content);
    });
  }, [setReviewData, isLike]);

  // 버튼 클릭시 좋아요 넣기

  const likeHandler = () => {
    // 게시글 작성자와 현재 유저가 같으면 작동 X
    if (reviewFrom?.memberId === userInfo[0]?.memberId) {
      api.info({
        message: `다나아`,
        description: '본인의 게시글엔 좋아요를 할 수 없습니다!',
        placement: 'top',
      });
      setLikeModal(false);
    } else {
      axios({
        method: 'post',
        url: `/posts/${reviewData?.postId}/likes`,
        headers: {
          Authorization: token,
          'Content-Security-Policy': 'upgrade-insecure-requests',
        },
      })
        .then(() => {
          seIsLike(true);
          setLikeModal(false);
        })
        .catch((error) => {
          api.info({
            message: `다나아`,
            description: '좋아요는 한 게시물에 한번만 가능합니다!',
            placement: 'top',
          });
          console.log(error);
          setLikeModal(false);
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
        <SReviewHeaderTitleBlock>
          <h1>{reviewData?.title}</h1>
        </SReviewHeaderTitleBlock>
        <SReviewInfoBlock className="info-block">
          <span>
            {reviewFrom?.displayName} [{reviewData?.regionName}]
          </span>
          <span>{reviewData?.modifiedAt?.replace('T', ' ').slice(0, -7)}</span>
        </SReviewInfoBlock>
        <SReviewHospitalInfo className="hopital-info">
          <span>{reviewData?.hospitalName}</span>
          <span>
            <Rate disabled value={stars} />
            {stars ? (
              <span className="ant-rate-text">{desc[stars - 1]}</span>
            ) : (
              ''
            )}
          </span>
        </SReviewHospitalInfo>
        <SReviewContent className="contents">
          <div>{parse(content)}</div>
          <SReviewButtonBlock className="review-footer">
            {userInfo[0]?.memberId === reviewFrom?.memberId ? (
              <button onClick={showLikeModal}>
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
      <HospitalLocation reviewData={reviewData} />
    </SReviewDetailContainer>
  );
};

export default ReviewDetail;
