import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState } from 'react';
import { Modal } from 'antd';

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

const CommentForm = ({ setPostComment, postId }) => {
  const token = localStorage.getItem('accessToken');

  const [comment, setComment] = useState();
  //제출하기 모달
  const [submitModal, setSubmitModal] = useState(false);

  const submitData = {
    content: `${comment}`,
  };

  const handleChangeText = (content) => {
    setComment(content);
    console.log(content);
  };

  const resetHandler = () => {
    setComment('');
    setPostComment(false);
  };

  // 제출하기 모달 관리
  const showSubmitModal = () => {
    setSubmitModal(true);
  };
  const submitHandleCancel = () => {
    setSubmitModal(false);
  };

  const submitHandler = () => {
    axios
      .post(`/comments/?post-id=${postId}`, submitData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPostComment(false);
        setSubmitModal(false);
      });
  };

  return (
    <SLayout>
      <Modal
        title="다나아"
        open={submitModal}
        onOk={submitHandler}
        onCancel={submitHandleCancel}
      >
        <p>댓글을 작성하시겠습니까??</p>
      </Modal>
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
          <SSubmitBtn type="submit" onClick={showSubmitModal}>
            확인
          </SSubmitBtn>
        </SBtnSection>
      </SwritingSection>
    </SLayout>
  );
};

export default CommentForm;
