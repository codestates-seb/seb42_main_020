import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const SLayout = styled.article`
  font-weight: 600;
  width: 790px;
  margin: 30px 0 30px 0;
  padding: 30px 10px;
`;

const SCommentOfferText = styled.h1`
  width: 100px;
  padding: 10px 10px 0 10px;
  background-color: var(--gray-100);
  text-align: center;
  font-size: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const SwritingSection = styled.div`
  padding: 15px;
  background-color: var(--gray-100);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 3px 2px 3px 2px var(--gray-200);
`;

const SWritingForm = styled.div`
  border: 1px solid var(--gray-300);
  box-shadow: 0 2px 3px 0 var(--gray-200);
  height: 150px;
  border-radius: 10px;
`;

const SBtnSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0 0 0;
`;

const SResetBtn = styled.button`
  border: none;
  background-color: var(--blue-500);
  color: var(--white);
  font-weight: 600;
  border-radius: 10px;
  padding: 7px 35px;
  margin-right: 15px;
  box-shadow: 0 2px 3px 0 var(--gray-200);
  cursor: pointer;
  :hover {
    background-color: var(--blue-600);
  }
`;

const SSubmitBtn = styled(SResetBtn)`
  margin-right: 0px;
`;

const CommentForm = () => {
  const handleChangeText = (content) => {
    console.log(content);
  };
  return (
    <SLayout>
      <SCommentOfferText>댓글 작성</SCommentOfferText>
      <SwritingSection>
        <SWritingForm>
          <ReactQuill
            theme="bubble"
            style={{
              height: '150px',
              fontSize: '15px',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
            onChange={handleChangeText}
            placeholder="댓글을 작성해 주세요"
          />
        </SWritingForm>
        <SBtnSection>
          <SResetBtn type="reset">취소</SResetBtn>
          <SSubmitBtn type="submit">확인</SSubmitBtn>
        </SBtnSection>
      </SwritingSection>
    </SLayout>
  );
};

export default CommentForm;
