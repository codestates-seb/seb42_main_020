import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, loggedUserInfo } from '../../atoms/atoms';
import CommentForm from '../../Components/CommentForm/CommentForm';
import Answers from '../../Components/Answers/Answers';

import {
  SQuestionDetailContainer,
  SQuestionDetailBlock,
  SQuestionHeaderBlock,
  SQuestionInfoBlock,
  SQuestionTextBlock,
  SQuestionButtonBlock,
  SAnswerProfilePic,
  SPostAnswerBlock,
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
  // 질문 데이터
  const [questionData, setQuestionData] = useState({});
  // 질문 작성자 정보
  const [writerInfo, setWriterInfo] = useState({});
  // 답글 목록
  const [comments, setComments] = useState([]);
  // 답글 작성자
  const [commentFrom, setCommentFrom] = useState({});
  // 답변창 다루기
  const [postComment, setPostComment] = useState(false);

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
      .get('/posts/2', {
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
        setCommentFrom(res.data.comments.writerResponse);
      });
  }, []);

  console.log('작성자');
  console.log(comments);
  console.log(commentFrom);

  const modifyHandler = () => {
    const modifyResult = confirm('질문을 수정하시겠습니까???');
    if (modifyResult) {
      navigate('/editquestion/2');
    }
  };

  const postCommentHandler = () => {
    setPostComment((prev) => !prev);
  };

  const deleteHandler = () => {
    const deleteResult = confirm('질문을 삭제하시겠습니까???');
    if (deleteResult) {
      alert('질문을 삭제하였습니다.');
      axios
        .delete(`/posts/${questionData.postId}`, {
          headers: {
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
      .post(`/posts/${questionData?.postId}/likes`, {
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

  return (
    <SQuestionDetailContainer className="detail-block">
      <SQuestionDetailBlock className="question-block">
        <SQuestionHeaderBlock className="header-block">
          <h1>🤔 {questionData?.title}</h1>
          <SQuestionInfoBlock className="info-block">
            <span>
              {writerInfo?.displayName} [{questionData?.regionName}]
            </span>
            <span>{questionData?.createdAt}</span>
          </SQuestionInfoBlock>
        </SQuestionHeaderBlock>
        <SQuestionTextBlock className="contents-block">
          <p>{questionData?.content}</p>
        </SQuestionTextBlock>

        {userInfo[0].memberId === writerInfo?.memberId ? (
          <SQuestionButtonBlock className="button-block">
            <button onClick={modifyHandler}>수정</button>
            <button onClick={deleteHandler}>삭제</button>
          </SQuestionButtonBlock>
        ) : (
          <SQuestionLikeButtonBlock className="button-block">
            <button onClick={likeHandler}>❤️ {questionData?.totalLike}</button>
          </SQuestionLikeButtonBlock>
        )}
      </SQuestionDetailBlock>
      {userInfo[0].memberId === writerInfo?.memberId ? null : (
        <SPostAnswerBlock className="want-answer-block">
          <SAnswerProfilePic src="/images/Swear.png" alt="img" />
          <div className="want-answer-text">
            <h1>대현자님의 답변을 기다리고 있어요!</h1>
            <span>지금 답변하여 채택받으시면 15점을 얻습니다.</span>
          </div>
          <button onClick={postCommentHandler}>답변하기!</button>
        </SPostAnswerBlock>
      )}
      {postComment ? <CommentForm /> : <></>}
      {/*  답글 여부에따라서 내용 변경, 서버가 완성되면 수정하겠음 */}
      {comments?.length === 0 ? (
        <></>
      ) : (
        comments?.map((ele) => {
          return <Answers ele={ele} key={ele.commentId} userInfo={userInfo} />;
        })
      )}
    </SQuestionDetailContainer>
  );
};

export default QuestionDetail;
