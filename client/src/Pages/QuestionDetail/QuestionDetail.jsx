import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, loggedUserInfo } from '../../atoms/atoms';

import {
  SQuestionDetailContainer,
  SQuestionDetailBlock,
  SQuestionHeaderBlock,
  SQuestionInfoBlock,
  SQuestionTextBlock,
  SQuestionButtonBlock,
  SAnswerHeader,
  SAnswerProfilePic,
  SPostAnswerBlock,
  SAnswerBlock,
  SAnswerInfoBlock,
  SAnswerUserInfoBlock,
  SAnswerButtonBlock,
  SQuestionLikeButtonBlock,
} from '../../Style/QuestionDetailStyle';

const QuestionDetail = () => {
  // const { params } = useParams();
  // 로그인 상태 정보 확인
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const userInfo = useRecoilState(loggedUserInfo);
  const token = localStorage.getItem('accessToken');

  // 글을 삭제할 경우 삭제 후 다른 페이지로 이동하기 위해
  const navigate = useNavigate();
  // 현재 로그인 상태가 글 작성자일 경우
  // 글의 채택여부(전문가)
  const [expertChoice, setExpertChoice] = useState(false);
  // 글의 채택여부 (일반인)
  const [normalChoice, setNormalChoice] = useState(false);
  // 질문 데이터
  const [questionData, setQuestionData] = useState({});
  // 질문 작성자 정보
  const [writerInfo, setWriterInfo] = useState({});
  // 답글 목록
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 로그인 상태가 아닐경우
    if (!isLogin) {
      alert('로그인을 해 주세요');
      navigate('/home');
    }
  }, [setIsLogin]);

  // 서버로부터 데이터 가져오기
  // paht는 수정 예정

  useEffect(() => {
    axios
      .get('/posts/5', {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setQuestionData(res.data);
        setWriterInfo(res.data.writerResponse);
        setComments(res.data.comments);
      });
  }, [questionData.totalLike]);
  const expertChoiceHandler = () => {
    if (!expertChoice) {
      const expertChoiceConfirm = confirm('답변을 채택하시겠습니까?');
      if (expertChoiceConfirm) {
        alert('채택하였습니다.');
        setExpertChoice((prev) => !prev);
        setNormalChoice(false);
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

  const normalChoiceHandler = () => {
    if (!normalChoice) {
      const normalChoiceConfirm = confirm('답변을 채택하시겠습니까?');
      if (normalChoiceConfirm) {
        alert('채택하였습니다.');
        setNormalChoice((prev) => !prev);
        setExpertChoice(false);
      }
    }

    if (normalChoice) {
      const expertChoiceCancel = confirm('답변 채택을 취소하시겠습니까?');
      if (expertChoiceCancel) {
        alert('채택을 취소하였습니다.');
        setNormalChoice((prev) => !prev);
      }
    }
  };

  const modifyHandler = () => {
    const modifyResult = confirm('질문을 수정하시겠습니까???');
    if (modifyResult) {
      navigate('/askquestion');
    }
  };

  const deleteHandler = () => {
    const deleteResult = confirm('질문을 삭제하시겠습니까???');
    if (deleteResult) {
      alert('질문을 삭제하였습니다.');
      axios
        .delete(`/posts/${questionData.postId}`, {
          header: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
      navigate('/');
    }
  };

  const likeHandler = () => {
    axios
      .post(`/posts/${questionData.postId}/likes`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        location.reload();

        console.log(res);
      });
  };

  console.log(comments);
  console.log(questionData);

  return (
    <SQuestionDetailContainer className="detail-block">
      <SQuestionDetailBlock className="question-block">
        <SQuestionHeaderBlock className="header-block">
          <h1>🤔 {questionData.title}</h1>
          <SQuestionInfoBlock className="info-block">
            <span>
              {writerInfo.displayName} [{questionData.regionName}]
            </span>
            <span>{questionData.createdAt}</span>
          </SQuestionInfoBlock>
        </SQuestionHeaderBlock>
        <SQuestionTextBlock className="contents-block">
          <p>{questionData.content}</p>
        </SQuestionTextBlock>

        {userInfo[0].memberId === writerInfo.memberId ? (
          <SQuestionButtonBlock className="button-block">
            <button onClick={modifyHandler}>수정</button>
            <button onClick={deleteHandler}>삭제</button>
          </SQuestionButtonBlock>
        ) : (
          <SQuestionLikeButtonBlock className="button-block">
            <button onClick={likeHandler}>❤️ {questionData.totalLike}</button>
          </SQuestionLikeButtonBlock>
        )}
      </SQuestionDetailBlock>
      {isLogin ? null : (
        <SPostAnswerBlock className="want-answer-block">
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
          <div className="want-answer-text">
            <h1>대현자님의 답변을 기다리고 있어요!</h1>
            <span>지금 답변하여 채택받으시면 15점을 얻습니다.</span>
          </div>
          <button>답변하기!</button>
        </SPostAnswerBlock>
      )}
      {/*  답글 여부에따라서 내용 변경, 서버가 완성되면 수정하겠음 */}
      {/* {comments.length === 0 ? <></> : <></>} */}
      <SAnswerBlock
        className={
          expertChoice ? 'expoert-choiced expert-answer' : 'expert-answer'
        }
      >
        {expertChoice ? <span>채택된 답변</span> : null}
        <SAnswerHeader className="header">
          <h1>전문가 답변</h1>
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
            <span>2023-03-02</span>
          </SAnswerUserInfoBlock>
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
        </SAnswerInfoBlock>
        <div className="answer-contents-block">
          <p>답변 내용입니다. 제 생각은 이렇습니다. 어쩌구 저쩌구~</p>
        </div>
        <SAnswerButtonBlock className="answer-button-block">
          <button onClick={expertChoiceHandler}>
            {expertChoice ? '채택 취소' : '채택 하기'}
          </button>
        </SAnswerButtonBlock>
      </SAnswerBlock>
      <SAnswerBlock
        className={
          normalChoice ? 'normal-choiced normal-answer' : 'normal-answer'
        }
      >
        {normalChoice ? <span>채택된 답변</span> : null}
        <SAnswerHeader className="header">
          <h1>일반인 답변</h1>
          {isLogin ? null : (
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          )}
        </SAnswerHeader>
        <SAnswerInfoBlock className="answer-header-block">
          <SAnswerUserInfoBlock className="answer-user-info">
            <span>작성자</span>
            <span>2023-03-02</span>
          </SAnswerUserInfoBlock>
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
        </SAnswerInfoBlock>
        <div className="answer-contents-block">
          <p>답변 내용입니다. 제 생각은 이렇습니다. 어쩌구 저쩌구~</p>
        </div>
        <SAnswerButtonBlock className="answer-button-block">
          {/* 추후에 채택 취소 없애기 */}
          <button onClick={normalChoiceHandler}>
            {normalChoice ? '채택 취소' : '채택 하기'}
          </button>
        </SAnswerButtonBlock>
      </SAnswerBlock>
    </SQuestionDetailContainer>
  );
};

export default QuestionDetail;
