import {
  SCommentBlock,
  SCommentHeader,
  SCommentSection,
  SButtonBlock,
} from '../../Style/CommentStyle';

const Comment = () => {
  return (
    <SCommentBlock>
      <SCommentHeader className="header">
        <span>승민</span>
        <span>2023-03-19 12:34</span>
      </SCommentHeader>
      <SCommentSection>
        <p>내용입니다 좋은 글 감사합니다.</p>
      </SCommentSection>
      <SButtonBlock>
        <button>신고</button>
      </SButtonBlock>
    </SCommentBlock>
  );
};

export default Comment;
