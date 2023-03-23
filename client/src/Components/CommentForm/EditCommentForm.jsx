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

const CommentForm = ({ commentId, value }) => {
  const token = localStorage.getItem('accessToken');

  const [comment, setComment] = useState(value);
  // 수정 확인 모달
  const [editModal, setEditModal] = useState(false);

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

  const handleOk = () => {
    setEditModal(false);
    axios
      .patch(`/comments/${commentId}`, submitData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        location.reload();
        console.log(res);
      });
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  const submitHandler = () => {
    setEditModal(true);
  };

  return (
    <SLayout>
      <Modal
        title="다나아"
        open={editModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>정말로 수정하시겠습니까?</p>
      </Modal>
      <SCommentOfferText>댓글 작성</SCommentOfferText>
      <SwritingSection>
        <SWritingForm>
          <ReactQuill
            theme="bubble"
            defaultValue={value}
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
