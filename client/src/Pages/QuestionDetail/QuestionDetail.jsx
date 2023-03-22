import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
import CommentForm from '../../Components/CommentForm/CommentForm';
import Answers from '../../Components/Answers/Answers';
import ReportModal from '../../Components/ReportModal/ReportModal';
import { Modal, notification } from 'antd';
import { BorderTopOutlined } from '@ant-design/icons';
import { FaBook, FaHeart } from 'react-icons/fa';

import {
  SQuestionDetailContainer,
  SQuestionDetailBlock,
  SQuestionHeaderBlock,
  SQuestionHeaderTitleBlock,
  SQuestionInfoBlock,
  SQuestionTextBlock,
  SQuestionButtonBlock,
  SAnswerProfilePic,
  SPostAnswerBlock,
  SQuestionLikeButtonBlock,
} from '../../Style/QuestionDetailStyle';

const QuestionDetail = () => {
  const { postId } = useParams();
  // 로그인 상태 정보 확인
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const userInfo = useRecoilState(loggedUserInfo);
  const token = localStorage.getItem('accessToken');

  // 글을 삭제할 경우 삭제 후 다른 페이지로 이동하기 위해
  const navigate = useNavigate();
  // 현재 로그인 상태가 글 작성자일 경우
  // 질문 데이터
  const [questionData, setQuestionData] = useState({});
  // 질문 작성자 정보
  const [writerInfo, setWriterInfo] = useState({});
  // 답글 목록
  const [comments, setComments] = useState([]);
  // 답변창 다루기
  const [postComment, setPostComment] = useState(false);
  // 신고 모달 다루기
  const [reportModal, setReportModal] = useState(false);
  // 삭제 알람 다루기
  const [deleteModal, setDeleteModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // 로그인 상태가 아닐경우
    if (!isLogin) {
      alert('로그인을 해 주세요');
      navigate('/');
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
      setQuestionData(res.data);
      setWriterInfo(res.data.writerResponse);
      setComments(res.data.comments);
    });
  }, []);

  const modifyHandler = () => {
    const modifyResult = confirm('질문을 수정하시겠습니까???');
    if (modifyResult) {
      navigate(`/home/question/edit/${questionData?.postId}`);
    }
  };

  const postCommentHandler = () => {
    setPostComment((prev) => !prev);
  };

  const reportModalHandler = () => {
    setReportModal((prev) => !prev);
  };

  const showModal = () => {
    setDeleteModal(true);
  };

  const handleOk = () => {
    axios
      .delete(`/posts/${questionData.postId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
    navigate('/home');
    setDeleteModal(false);
  };

  const handleCancel = () => {
    setDeleteModal(false);
  };

  const likeHandler = () => {
    // 게시글 작성자와 현재 유저가 같으면 작동 X
    if (writerInfo?.memberId === userInfo[0]?.memberId) {
      return null;
    } else {
      axios({
        method: 'post',
        url: `/posts/${questionData?.postId}/likes`,
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

  console.log('정보', questionData);

  return (
    <SQuestionDetailContainer className="detail-block">
      {contextHolder}
      <Modal
        title="다나아"
        open={deleteModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>정말로 삭제하시겠습니까?</p>
      </Modal>
      {reportModal ? (
        <ReportModal
          reportModal={reportModal}
          setReportModal={setReportModal}
          reportModalHandler={reportModalHandler}
        />
      ) : (
        <></>
      )}
      <SQuestionDetailBlock className="question-block">
        <SQuestionHeaderBlock className="header-block">
          <SQuestionHeaderTitleBlock>
            <FaBook />
            <h1>{questionData?.title}</h1>
          </SQuestionHeaderTitleBlock>

          <SQuestionInfoBlock className="info-block">
            <span>
              {writerInfo?.displayName} [{questionData?.regionName}]
            </span>
            <span>
              {questionData?.modifiedAt?.replace('T', ' ').slice(0, -7)}
            </span>
          </SQuestionInfoBlock>
        </SQuestionHeaderBlock>
        <SQuestionTextBlock className="contents-block">
          <p>{questionData?.content?.slice(3, -4)}</p>
        </SQuestionTextBlock>

        {userInfo[0]?.memberId === writerInfo?.memberId ? (
          <SQuestionButtonBlock className="button-block">
            <button
              onClick={likeHandler}
              type="primary"
              icon={<BorderTopOutlined />}
            >
              <FaHeart /> {questionData?.totalLike}
            </button>
            <div>
              <button onClick={modifyHandler}>수정</button>
              <button type="primary" onClick={showModal}>
                삭제
              </button>
            </div>
          </SQuestionButtonBlock>
        ) : (
          <SQuestionLikeButtonBlock className="button-block not-same-from">
            <button
              onClick={likeHandler}
              type="primary"
              icon={<BorderTopOutlined />}
            >
              <FaHeart /> {questionData?.totalLike}
            </button>
            <button onClick={reportModalHandler}>신고하기</button>
          </SQuestionLikeButtonBlock>
        )}
      </SQuestionDetailBlock>
      {userInfo[0]?.memberId === writerInfo?.memberId ||
      questionData?.postStatus === 'POST_ACCEPTED' ? null : (
        <SPostAnswerBlock className="want-answer-block">
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
          <div className="want-answer-text">
            <h1>{userInfo[0]?.displayName}의 답변을 기다리고 있어요!</h1>
            <span>지금 답변하여 채택받으시면 15점을 얻습니다.</span>
          </div>
          <button onClick={postCommentHandler}>답변하기!</button>
        </SPostAnswerBlock>
      )}
      {postComment ? (
        <CommentForm setPostComment={setPostComment} postId={postId} />
      ) : (
        <></>
      )}
      {/*  답글 여부에따라서 내용 변경, 서버가 완성되면 수정하겠음 */}
      {comments?.length === 0 ? (
        <></>
      ) : (
        // 채택된 답변 우선 렌더링
        comments?.map((ele) => {
          if (ele.commentStatus !== 'COMMENT_DELETED') {
            return (
              <Answers
                key={ele.commentId}
                ele={ele}
                token={token}
                userInfo={userInfo}
                writerInfo={writerInfo}
                questionData={questionData}
              />
            );
          }
        })
      )}
    </SQuestionDetailContainer>
  );
};

export default QuestionDetail;
