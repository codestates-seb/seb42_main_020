import {
  SQuestionDetailContainer,
  SQuestionDetailBlock,
  SQuestionHeaderBlock,
  SQuestionInfoBlock,
  SQuestionTextBlock,
  SQuestionButtonBlock,
  SPostAnswerBlock,
  SAnswerBlock,
  SAnswerInfoBlock,
  SAnswerUserInfoBlock,
  SAnswerButtonBlock,
} from '../../Style/QuestionDetailStyle';

const QuestionDetail = () => {
  return (
    <SQuestionDetailContainer className="detail-block">
      <SQuestionDetailBlock className="question-block">
        <SQuestionHeaderBlock className="header-block">
          <h1>? 게시글 제목 입니다.</h1>
          <SQuestionInfoBlock className="info-block">
            <span>작성자입니다.</span>
            <span>작성시간입니다.</span>
          </SQuestionInfoBlock>
        </SQuestionHeaderBlock>
        <SQuestionTextBlock className="contents-block">
          <p>질문입니다. 테스트 입니다. 주르르르르르륵</p>
        </SQuestionTextBlock>
        <SQuestionButtonBlock className="button-block">
          <button>수정</button>
          <button>삭제</button>
        </SQuestionButtonBlock>
      </SQuestionDetailBlock>
      <SPostAnswerBlock className="want-answer-block">
        <span>이미지</span>
        <div className="want-answer-text">
          <h1>~~님 답변을 작성하시겠습니까????</h1>
          <span>지금 답변하여 채택받으시면 15점을 얻습니다.</span>
        </div>
        <button>답변하기!</button>
      </SPostAnswerBlock>
      <SAnswerBlock className="answer-blcok">
        <h1>전문가 답변 입니다.</h1>
        <SAnswerInfoBlock className="answer-header-block">
          <SAnswerUserInfoBlock className="answer-user-info">
            <span>작성자</span>
            <span>2023-03-02</span>
          </SAnswerUserInfoBlock>
          <span>이미지</span>
        </SAnswerInfoBlock>
        <div className="answer-contents-block">
          <p>답변 내용입니다. 제 생각은 이렇습니다. 어쩌구 저쩌구~</p>
        </div>
        <SAnswerButtonBlock className="answer-button-block">
          <button>수정</button>
          <button>삭제</button>
        </SAnswerButtonBlock>
      </SAnswerBlock>
    </SQuestionDetailContainer>
  );
};

export default QuestionDetail;
