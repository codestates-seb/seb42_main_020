import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState } from 'react';
import 'react-quill/dist/quill.bubble.css';

import {
  SLayout,
  SCommentOfferText,
  SwritingSection,
  SWritingForm,
  SBtnSection,
  SResetBtn,
  SSubmitBtn,
} from '../../Style/CommentFormStyle';

const CommentForm = () => {
  const token = localStorage.getItem('accessToken');

  const [comment, setComment] = useState();

  const submitData = {
    content: `${comment}`,
  };

  const handleChangeText = (content) => {
    setComment(content);
    console.log(content);
  };

  const resetHandler = () => {
    setComment('');
  };

  const submitHandler = () => {
    axios
      .post(`/comments/?post-id=2`, submitData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        location.reload();
        console.log(res);
      });
  };

  return (
    <SLayout>
      <SCommentOfferText>댓글 작성</SCommentOfferText>
      <SwritingSection>
        <SWritingForm>
          <ReactQuill
            theme="bubble"
            value={comment}
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
          <SResetBtn type="reset" onClick={resetHandler}>
            취소
          </SResetBtn>
          <SSubmitBtn type="submit" onClick={submitHandler}>
            확인
          </SSubmitBtn>
        </SBtnSection>
      </SwritingSection>
    </SLayout>
  );
};

export default CommentForm;
