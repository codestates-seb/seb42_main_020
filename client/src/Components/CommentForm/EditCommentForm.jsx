import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState } from 'react';
import { Modal } from 'antd';
import { getAccessTokenFromLocal } from '../../util/Token';

import 'react-quill/dist/quill.bubble.css';

import {
  SLayout,
  SCommentOfferText,
  SwritingSection,
  SWritingForm,
  SBtnSection,
  SResetBtn,
  SSubmitBtn,
  SValidFail,
} from '../../Style/CommentFormStyle';

const CommentForm = ({ commentId, value, setComments, setOpenEdit }) => {
  const token = getAccessTokenFromLocal();

  const [comment, setComment] = useState(value);
  const [commentValid, setCommentValid] = useState(false);
  const [cammentMessage, setCommentMessage] = useState('');
  // 수정 확인 모달
  const [editModal, setEditModal] = useState(false);

  const submitData = {
    content: `${comment}`,
  };

  const handleChangeText = (content) => {
    if (content.length - 8 > 40) {
      setCommentMessage('내용은 40글자 이내로 입력해주세요');
      setCommentValid(false);
    } else {
      setCommentMessage('');
      setCommentValid(true);
    }
    setComment(content);
  };

  const resetHandler = () => {
    setComment('');
    setOpenEdit(false);
  };

  const handleOk = () => {
    axios
      .patch(`/comments/${commentId}`, submitData, {
        headers: {
          Authorization: token,
          'Content-Security-Policy': 'upgrade-insecure-requests',
        },
      })
      .then((res) => {
        setComments(res.data);
        setEditModal(false);
        setOpenEdit(false);
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
        <SValidFail>{commentValid ? '' : cammentMessage}</SValidFail>
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
