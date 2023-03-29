import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import parse from 'html-react-parser';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
import CommentForm from '../../Components/CommentForm/CommentForm';
import Answers from '../../Components/Answers/Answers';
import ReportModal from '../../Components/ReportModal/ReportModal';
import { getAccessTokenFromLocal } from '../../util/Token';
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
  const token = getAccessTokenFromLocal();

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
  // 좋아요 모달 다루기
  const [likeModal, setLikeModal] = useState(false);
  // 좋아요 누른 여부
  const [isLike, setIsLike] = useState(false);
  // 게시글 수정 모달 다루기
  const [editModal, setEditModal] = useState(false);
  // 댓글 채택 여부
  const [selected, setSelected] = useState(false);
  // 댓글 좋아요 여부
  const [commentLike, setCommetLike] = useState(false);
  // 서버에서 가져온 질문 내용
  const [content, setContent] = useState('');
  const [api, contextHolder] = notification.useNotification();

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

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/posts/${postId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
        // 'Content-Security-Policy': 'upgrade-insecure-requests',
        Authorization: token,
      },
    }).then((res) => {
      setQuestionData(res.data);
      setWriterInfo(res.data.writerResponse);
      setContent(res.data.content);
    });
  }, [isLike, editModal, postComment, comments, selected, commentLike]);

  // 게시글 수정
  const modifyHandler = () => {
    navigate(`/home/question/edit/${questionData?.postId}`);
  };

  const showEditModal = () => {
    if (questionData?.postStatus === 'POST_ACCEPTED') {
      api.info({
        message: `다나아`,
        description: '채택된 답변이 있을 경우 게시글을 수정하실 수 없습니다!',
        placement: 'top',
      });
    } else {
      setEditModal(true);
    }
  };

  const editHandleCancel = () => {
    setEditModal(false);
  };

  const postCommentHandler = () => {
    setPostComment((prev) => !prev);
  };

  // 신고하기 모달
  const reportModalHandler = () => {
    setReportModal((prev) => !prev);
  };
  // 삭제하기 확인 모달
  const showModal = () => {
    if (questionData?.postStatus === 'POST_ACCEPTED') {
      api.info({
        message: `다나아`,
        description: '채택된 답변이 있을 경우 게시글을 삭제하실 수 없습니다!',
        placement: 'top',
      });
    } else {
      setDeleteModal(true);
    }
  };

  const handleCancel = () => {
    setDeleteModal(false);
  };

  const handleOk = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/posts/${questionData.postId}`, {
        headers: {
          Authorization: token,
          // 'Content-Security-Policy': 'upgrade-insecure-requests',
        },
      })
      .then((res) => {
        console.log(res);
      });
    navigate('/home');
    setDeleteModal(false);
  };

  // 좋아요 모달 관리
  const showLikeModal = () => {
    setLikeModal(true);
  };
  const likeHandleCancel = () => {
    setLikeModal(false);
  };

  // 좋아요 관리
  const likeHandler = () => {
    // 게시글 작성자와 현재 유저가 같으면 작동 X
    if (writerInfo?.memberId === userInfo[0]?.memberId) {
      api.info({
        message: `다나아`,
        description: '본인의 게시글엔 좋아요를 할 수 없습니다!',
        placement: 'top',
      });
      setLikeModal(false);
      return null;
    } else {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/posts/${questionData?.postId}/likes`,
        headers: {
          Authorization: token,
          // 'Content-Security-Policy': 'upgrade-insecure-requests',
        },
      })
        .then(() => {
          // location.reload();
          setIsLike(true);
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
      <Modal
        title="다나아"
        open={likeModal}
        onOk={likeHandler}
        onCancel={likeHandleCancel}
      >
        <p>해당 게시글이 맘에 드시나요???</p>
      </Modal>
      <Modal
        title="다나아"
        open={editModal}
        onOk={modifyHandler}
        onCancel={editHandleCancel}
      >
        <p>게시글을 수정하시겠습니까??</p>
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
          <div>{parse(content)}</div>
        </SQuestionTextBlock>
        {userInfo[0]?.memberId === writerInfo?.memberId ? (
          <SQuestionButtonBlock className="button-block">
            <button
              onClick={showLikeModal}
              type="primary"
              icon={<BorderTopOutlined />}
            >
              <FaHeart /> {questionData?.totalLike}
            </button>
            <div>
              <button onClick={showEditModal}>수정</button>
              <button type="primary" onClick={showModal}>
                삭제
              </button>
            </div>
          </SQuestionButtonBlock>
        ) : (
          <SQuestionLikeButtonBlock className="button-block not-same-from">
            <button
              onClick={showLikeModal}
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
            <h1>
              {userInfo[0]?.doctor
                ? `${userInfo[0]?.name}의 답변을 기다리고 있어요!`
                : `${userInfo[0]?.displayName}의 답변을 기다리고 있어요!`}
            </h1>
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
      {/* 채택된 답변 우선 렌더링 */}
      {questionData?.comments?.length === 0 ? (
        <></>
      ) : (
        questionData?.comments
          ?.filter((ele) => ele.commentStatus === 'COMMENT_ACCEPTED')
          .map((ele) => {
            return (
              <Answers
                key={ele.commentId}
                ele={ele}
                userInfo={userInfo}
                writerInfo={writerInfo}
                questionData={questionData}
                comments={comments}
                setComments={setComments}
                setPostComment={setPostComment}
                setSelected={setSelected}
                setCommetLike={setCommetLike}
              />
            );
          })
      )}

      {questionData?.comments?.length === 0 ? (
        <></>
      ) : (
        questionData?.comments
          ?.filter((ele) => ele.commentStatus !== 'COMMENT_ACCEPTED')
          .map((ele) => {
            if (ele.commentStatus !== 'COMMENT_DELETED') {
              return (
                <Answers
                  key={ele.commentId}
                  ele={ele}
                  userInfo={userInfo}
                  writerInfo={writerInfo}
                  questionData={questionData}
                  comments={comments}
                  setComments={setComments}
                  setPostComment={setPostComment}
                  setSelected={setSelected}
                  setCommetLike={setCommetLike}
                />
              );
            }
          })
      )}
    </SQuestionDetailContainer>
  );
};

export default QuestionDetail;
