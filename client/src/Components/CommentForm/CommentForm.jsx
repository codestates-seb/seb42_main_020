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

const CommentForm = ({ setPostComment, postId }) => {
  const token = getAccessTokenFromLocal();

  const [comment, setComment] = useState();
  const [commentValid, setCommentValid] = useState(false);
  const [cammentMessage, setCommentMessage] = useState('');
  //제출하기 모달
  const [submitModal, setSubmitModal] = useState(false);

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
    setPostComment(false);
  };

  // 제출하기 모달 관리
  const showSubmitModal = () => {
    if (comment.length < 5) {
      setCommentMessage('내용은 5글자 이상 입력해주세요');
      setCommentValid(false);
    }
    if (comment.length > 50) {
      setCommentMessage('내용은 50글자 이내로 입력해주세요');
      setCommentValid(false);
    }

    if (commentValid) {
      setSubmitModal(true);
    }
  };
  const submitHandleCancel = () => {
    setSubmitModal(false);
  };

  const submitHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comments/?post-id=${postId}`,
        submitData,
        {
          headers: {
            Authorization: token,
            'Content-Security-Policy': 'upgrade-insecure-requests',
          },
        }
      )
      .then(() => {
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
        <SValidFail>{commentValid ? '' : cammentMessage}</SValidFail>
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
