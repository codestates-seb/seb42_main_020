import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import EditCommentForm from '../../Components/CommentForm/EditCommentForm';
import ReportCommentModal from '../ReportModal/ReportComment';
import { Modal, notification } from 'antd';
import { BorderTopOutlined } from '@ant-design/icons';
import { FaUserTie, FaUserMd, FaHeart } from 'react-icons/fa';
import {
  SAnswerHeader,
  SAnswerProfilePic,
  SAnswerBlock,
  SAnswerHeaderTitleBlock,
  SAnswerInfoBlock,
  SAnswerUserInfoBlock,
  SAnswerButtonBlock,
} from '../../Style/QuestionDetailStyle';

// import { SButtonBlock } from '../../Style/Answer';

const Answers = ({
  ele,
  token,
  userInfo,
  questionData,
  writerInfo,
  comments,
  setComments,
  setSelected,
  setCommetLike,
}) => {
  // poarms 값
  const { postId } = useParams();
  //수정 모달 관리
  const [openEdit, setOpenEdit] = useState(false);
  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(false);
  // 게시글 작성자 관리
  const commentFrom = ele.writerResponse;
  // 삭제 알람 다루기
  const [deleteModal, setDeleteModal] = useState(false);
  // 좋아요 모달 다루기
  const [likeModal, setLikeModal] = useState(false);
  // 채택 모달 다루기
  const [selectModal, setSelectModal] = useState(false);

  // 좋아요 중복 경고 창
  const [api, contextHolder] = notification.useNotification();

  // 삭제 모달 관리
  const handleOk = () => {
    axios({
      method: 'delete',
      url: `/comments/${ele.commentId}`,
      headers: {
        Authorization: token,
        // 'Content-Security-Policy': 'upgrade-insecure-requests',
      },
    }).then((res) => {
      console.log(res);
      const newData = comments.filter(
        (el) => el.commentId !== comments.commentId
      );
      setComments(newData);
    });
    setDeleteModal(false);
  };

  const showModal = () => {
    setDeleteModal(true);
  };
  const handleCancel = () => {
    setDeleteModal(false);
  };

  // 채택 모달 관리
  const showSelectModal = () => {
    setSelectModal(true);
  };
  const selectHandleCancel = () => {
    setSelectModal(false);
  };

  // 댓글 채택
  const choiceHandler = () => {
    axios({
      method: 'patch',
      url: `/posts/${postId}/comments/${ele.commentId}`,
      headers: {
        Authorization: token,
        // 'Content-Security-Policy': 'upgrade-insecure-requests',
      },
    }).then((res) => {
      console.log(res);
      setSelected(true);
      setSelectModal(false);
    });
  };

  // 댓글 수정
  const editCommentHandler = () => {
    setOpenEdit((prev) => !prev);
  };

  // 좋아요 모달 관리
  const showLikeModal = () => {
    setLikeModal(true);
  };
  const likeHandleCancel = () => {
    setLikeModal(false);
  };

  // 좋아요 모달 + axios
  const commentLikeHandler = (id) => {
    console.log('상태', userInfo[0]?.memberId, commentFrom?.memberId);
    if (userInfo[0]?.memberId === commentFrom?.memberId) {
      api.info({
        message: `다나아`,
        description: '본인 댓글에는 좋아요를 누를 수 없습니다.',
        placement: 'top',
      });
      setLikeModal(false);
    } else {
      axios({
        method: 'post',
        url: `/comments/${id}/likes`,
        headers: {
          Authorization: token,
          // 'Content-Security-Policy': 'upgrade-insecure-requests',
        },
      })
        .then((res) => {
          setCommetLike(true);
          setLikeModal(false);
          console.log(res);
        })
        .catch((error) => {
          api.info({
            message: `다나아`,
            description: '좋아요는 한 게시물에 한번만 가능합니다!',
            placement: 'top',
          });
          setLikeModal(false);
          console.log(error);
        });
    }
  };

  // 모달창 관리하기
  const reportModalHandler = () => {
    setReportModal((prev) => !prev);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="다나아"
        open={selectModal}
        onOk={choiceHandler}
        onCancel={selectHandleCancel}
      >
        <p>해당 답변을 채택하시겠습니까??</p>
      </Modal>

      <Modal
        title="다나아"
        open={deleteModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>정말로 삭제하시겠습니까??</p>
      </Modal>
      <Modal
        title="다나아"
        open={likeModal}
        onOk={() => commentLikeHandler(ele.commentId)}
        onCancel={likeHandleCancel}
      >
        <p>해당 댓글이 맘에 드시나요???</p>
      </Modal>
      {reportModal ? (
        <ReportCommentModal
          setReportModal={setReportModal}
          reportModalHandler={reportModalHandler}
          ele={ele}
        />
      ) : (
        <></>
      )}

      <SAnswerBlock
        className={commentFrom?.doctor ? ' expert-answer' : 'normal-answer'}
      >
        {ele.commentStatus === 'COMMENT_ACCEPTED' ? (
          <span>채택된 답변</span>
        ) : null}
        <SAnswerHeader className="header">
          {commentFrom?.doctor ? (
            <SAnswerHeaderTitleBlock>
              <FaUserMd />
              <h1>전문가 답변</h1>
            </SAnswerHeaderTitleBlock>
          ) : (
            <SAnswerHeaderTitleBlock>
              <FaUserTie />
              <h1>일반인 답변</h1>
            </SAnswerHeaderTitleBlock>
          )}
          {/* // 질문작성자와 현재 로그인한 사람일 동일인물 
          // 질문이 채택되지않은
          상태 */}
          {ele.commentStatus !== 'COMMENT_ACCEPTED' &&
          questionData.postStatus !== 'POST_ACCEPTED' &&
          userInfo[0].memberId !== commentFrom?.memberId &&
          userInfo[0].memberId === writerInfo.memberId ? (
            <button onClick={showSelectModal}>채택 하기</button>
          ) : (
            <></>
          )}
        </SAnswerHeader>
        <SAnswerInfoBlock className="answer-header-block">
          <SAnswerUserInfoBlock className="answer-user-info">
            <span>
              {commentFrom?.doctor
                ? `${commentFrom?.name} 님`
                : `${commentFrom?.displayName} 님`}
            </span>
            <span>{ele?.createdAt?.replace('T', ' ').slice(0, -7)}</span>
          </SAnswerUserInfoBlock>
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
        </SAnswerInfoBlock>
        <div className="answer-contents-block">
          {/* <p>{ele?.content?.slice(3, -4)}</p> */}
          <div>{parse(ele.content)}</div>
        </div>
        <SAnswerButtonBlock className="answer-button-block">
          <button
            type="primary"
            icon={<BorderTopOutlined />}
            // onClick={() => {
            //   commentLikeHandler(ele.commentId);
            // }}
            onClick={showLikeModal}
          >
            <FaHeart /> {ele.totalLike}
          </button>
          {userInfo[0]?.memberId === commentFrom?.memberId ? (
            <div>
              <button onClick={editCommentHandler}>수정하기</button>
              <button type="primary" onClick={showModal}>
                삭제하기
              </button>
            </div>
          ) : (
            <div>
              <button onClick={reportModalHandler}>신고하기</button>
            </div>
          )}
        </SAnswerButtonBlock>
      </SAnswerBlock>
      {openEdit ? (
        <EditCommentForm
          commentId={ele.commentId}
          value={ele.content}
          setOpenEdit={setOpenEdit}
          setComments={setComments}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Answers;
