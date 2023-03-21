import axios from 'axios';
import { useState } from 'react';
import EditCommentForm from '../../Components/CommentForm/EditCommentForm';
import ReportCommentModal from '../ReportModal/ReportComment';
import {
  SAnswerHeader,
  SAnswerProfilePic,
  SAnswerBlock,
  SAnswerInfoBlock,
  SAnswerUserInfoBlock,
  SAnswerButtonBlock,
} from '../../Style/QuestionDetailStyle';

// import { SButtonBlock } from '../../Style/Answer';

const Answers = ({ ele, userInfo }) => {
  const token = localStorage.getItem('accessToken');
  //수정 모달 관리
  const [openEdit, setOpenEdit] = useState(false);
  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(false);
  // 댓글 채택 관리
  // const [choiced, setChoiced] = useState(false);

  // 댓글 작성자 관리
  const commentFrom = ele.writerResponse;

  console.log(ele);
  // 댓글 삭제
  const deleteHandler = () => {
    axios({
      method: 'delete',
      url: `/comments/${ele.commentId}`,
      headers: { Authorization: token },
    }).then((res) => {
      location.reload();
      console.log(res);
    });
  };

  // 댓글 채택
  const choiceHandler = () => {
    axios({
      method: 'patch',
      url: `/posts/2/comments/${ele.commentId}`,
      headers: { Authorization: token },
    }).then((res) => {
      location.reload();
      console.log(res);
    });
  };

  // 댓글 수정
  const editCommentHandler = () => {
    setOpenEdit((prev) => !prev);
  };

  // 좋아요
  const commentLikeHandler = (id) => {
    axios({
      method: 'post',
      url: `/comments/${id}/likes`,
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

  console.log(userInfo[0]);

  return (
    <>
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
        className={commentFrom.isDoctor ? ' expert-answer' : 'expert-answer'}
      >
        {ele.commentStatus === 'COMMENT_ACCEPTED' ? (
          <span>채택된 답변</span>
        ) : null}
        <SAnswerHeader className="header">
          {commentFrom?.isDoctor ? <h1>전문가 답변</h1> : <h1>일반인 답변</h1>}
          {ele.commentStatus === 'COMMENT_ACCEPTED' ? (
            <></>
          ) : (
            <button onClick={choiceHandler}>채택 하기</button>
          )}
        </SAnswerHeader>
        <SAnswerInfoBlock className="answer-header-block">
          <SAnswerUserInfoBlock className="answer-user-info">
            <span>{commentFrom?.displayName}</span>
            <span>{ele.createdAt.replace('T', ' ').slice(0, -7)}</span>
          </SAnswerUserInfoBlock>
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
        </SAnswerInfoBlock>
        <div className="answer-contents-block">
          <p>{ele.content.slice(3, -4)}</p>
        </div>
        <SAnswerButtonBlock className="answer-button-block">
          <button
            onClick={() => {
              commentLikeHandler(ele.commentId);
            }}
          >
            ❤️ {ele.totalLike}
          </button>
          {userInfo[0]?.memberId === commentFrom?.memberId ? (
            <div>
              <button onClick={editCommentHandler}>수정하기</button>
              <button onClick={deleteHandler}>삭제하기</button>
            </div>
          ) : (
            <div>
              <button onClick={reportModalHandler}>신고하기</button>
            </div>
          )}
        </SAnswerButtonBlock>
      </SAnswerBlock>
      {openEdit ? (
        <EditCommentForm commentId={ele.commentId} value={ele.content} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Answers;
