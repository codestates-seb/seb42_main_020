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

import { SButtonBlock } from '../../Style/Answer';

const Answers = ({ ele, userInfo }) => {
  const token = localStorage.getItem('accessToken');
  //수정 모달 관리
  const [openEdit, setOpenEdit] = useState(false);

  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(true);
  // 글의 채택여부(전문가)
  const [expertChoice, setExpertChoice] = useState(false);
  // 글의 채택여부 (일반인)
  //   const [normalChoice, setNormalChoice] = useState(false);

  // 댓글 작성자 관리
  const commentFrom = ele.writerResponse;
  console.log(commentFrom);

  const expertChoiceHandler = () => {
    if (!expertChoice) {
      const expertChoiceConfirm = confirm('답변을 채택하시겠습니까?');
      if (expertChoiceConfirm) {
        alert('채택하였습니다.');
        setExpertChoice((prev) => !prev);
        // setNormalChoice(false);
      }
    }

    if (expertChoice) {
      const expertChoiceConfirmCancel =
        confirm('답변 채택을 취소하시겠습니까?');
      if (expertChoiceConfirmCancel) {
        alert('채택을 취소하였습니다.');
        setExpertChoice((prev) => !prev);
      }
    }
  };

  //   const normalChoiceHandler = () => {
  //     if (!normalChoice) {
  //       const normalChoiceConfirm = confirm('답변을 채택하시겠습니까?');
  //       if (normalChoiceConfirm) {
  //         alert('채택하였습니다.');
  //         setNormalChoice((prev) => !prev);
  //         setExpertChoice(false);
  //       }
  //     }

  //     if (normalChoice) {
  //       const expertChoiceCancel = confirm('답변 채택을 취소하시겠습니까?');
  //       if (expertChoiceCancel) {
  //         alert('채택을 취소하였습니다.');
  //         setNormalChoice((prev) => !prev);
  //       }
  //     }
  //   };

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

  return (
    <>
      {reportModal ? (
        <></>
      ) : (
        <ReportCommentModal
          setReportModal={setReportModal}
          reportModalHandler={reportModalHandler}
          ele={ele}
        />
      )}

      <SAnswerBlock
        className={
          commentFrom.isDoctor
            ? 'expoert-choiced expert-answer'
            : 'expert-answer'
        }
      >
        {expertChoice ? <span>채택된 답변</span> : null}
        <SAnswerHeader className="header">
          {commentFrom.isDoctor ? <h1>전문가 답변</h1> : <h1>일반인 답변</h1>}
        </SAnswerHeader>
        <SAnswerInfoBlock className="answer-header-block">
          <SAnswerUserInfoBlock className="answer-user-info">
            <span>{ele.displayName}</span>
            <span>{ele.createdAt}</span>
          </SAnswerUserInfoBlock>
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
        </SAnswerInfoBlock>
        <div className="answer-contents-block">
          <p>{ele.content}</p>
        </div>
        <SAnswerButtonBlock className="answer-button-block">
          <button
            onClick={() => {
              commentLikeHandler(ele.commentId);
            }}
          >
            ❤️ {ele.totalLike}
          </button>
          {userInfo[0].memberId === commentFrom.memberId ? (
            <SButtonBlock>
              <button onClick={deleteHandler}>삭제하기</button>
              <button onClick={editCommentHandler}>수정</button>
            </SButtonBlock>
          ) : (
            <div>
              <button onClick={reportModalHandler}>신고하기</button>
              <button onClick={choiceHandler}>
                {expertChoice ? '채택 취소' : '채택 하기'}
              </button>
              <button onClick={expertChoiceHandler}>채택</button>
            </div>
          )}
          <div></div>
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
