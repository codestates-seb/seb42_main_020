import axios from 'axios';
import { useState } from 'react';

import ReportModal from '../ReportModal/ReportModal';

import {
  SAnswerHeader,
  SAnswerProfilePic,
  SAnswerBlock,
  SAnswerInfoBlock,
  SAnswerUserInfoBlock,
  SAnswerButtonBlock,
} from '../../Style/QuestionDetailStyle';

const Answers = ({ ele, userInfo }) => {
  // 신고 모달 관리
  const [reportModal, setReportModal] = useState(true);
  // 글의 채택여부(전문가)
  const [expertChoice, setExpertChoice] = useState(false);
  // 글의 채택여부 (일반인)
  //   const [normalChoice, setNormalChoice] = useState(false);

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

  const commentLikeHandler = (id) => {
    axios.post(`/comments/${id}/likes`).then((res) => {
      console.log(res);
      location.reload();
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
        <ReportModal
          setReportModal={setReportModal}
          reportModalHandler={reportModalHandler}
        />
      )}

      <SAnswerBlock
        className={
          expertChoice ? 'expoert-choiced expert-answer' : 'expert-answer'
        }
      >
        {expertChoice ? <span>채택된 답변</span> : null}
        <SAnswerHeader className="header">
          {ele.commentId === 1 ? <h1>전문가 답변</h1> : <h1>일반인 답변</h1>}
          {/* 댓글 작성자 정보 확인되면 수정 */}
          {userInfo[0].memberId ? null : (
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          )}
        </SAnswerHeader>
        <SAnswerInfoBlock className="answer-header-block">
          <SAnswerUserInfoBlock className="answer-user-info">
            <span>작성자</span>
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
          <div>
            <button onClick={reportModalHandler}>신고하기</button>
            {/* 리뷰 작성자 리스트 나오면 해결 */}
            {<button>삭제하기</button>}
            <button onClick={expertChoiceHandler}>
              {expertChoice ? '채택 취소' : '채택 하기'}
            </button>
          </div>
        </SAnswerButtonBlock>
      </SAnswerBlock>
    </>
  );
};

export default Answers;
