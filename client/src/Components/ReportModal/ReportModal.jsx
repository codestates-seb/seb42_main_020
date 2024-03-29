import { useEffect, useState } from 'react';
import ReviewReason from './ReviewReason';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { getAccessTokenFromLocal } from '../../util/Token';
import { Modal } from 'antd';
import {
  SReportModalContainer,
  SReportModalBlock,
  SReportModalHeader,
  SReportText,
  SReportModalButtonBlock,
  SReportModalClose,
  SFailMessage,
} from '../../Style/ReportModalStyle';

const ReportModal = ({ reportModalHandler, setReportModal }) => {
  //토큰
  const token = getAccessTokenFromLocal();
  // 파람값
  const { postId } = useParams();

  //모달 제출 내용
  const [reportText, setReportText] = useState('');
  // 신고 사유 유효성
  const [textValid, setTextValid] = useState(false);
  // 신고 사유 메시지
  const [textFailMessage, setTextFailMessage] = useState('');
  // 신고 사유
  const [reportReason, setReportReason] = useState(null);
  // 신고 사유 유효성
  const [reasonValid, setReasonValid] = useState(false);
  // 사유 실패 메시지
  const [reasonFailMessage, setReasonFailMessage] = useState('');

  const [reportInfo, setReportInfo] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setReportInfo({
      reason: reportReason,
      content: reportText,
    });
  }, [reportReason, reportText]);

  const showModal = () => {
    if (reportText === '') {
      setTextValid(false);
      setTextFailMessage('내용은 5글자 이상 입력해주세요');
    }

    if (reportReason === null) {
      setReasonValid(false);
      setReasonFailMessage('올바른 사유를 선택해 주세요');
    }

    if (reasonValid && textValid) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleOk = () => {
    if (textValid && reasonValid) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/posts/${postId}/report`,
          reportInfo,
          {
            headers: {
              Authorization: token,
              // 'Content-Security-Policy': 'upgrade-insecure-requests',
            },
          }
        )
        .then(() => {});
      setIsModalOpen(false);
      setReportModal(false);
      navigate(`/home`);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 신고 사유
  const reportReasonHandler = (e) => {
    setReportReason(e);

    if (e === null || e === '' || e === undefined) {
      setReasonValid(false);
      setReasonFailMessage('올바른 사유를 선택해 주세요');
    } else {
      setReasonValid(true);
    }
    setReportReason(e);
  };
  // 신고 내용
  const reportTextHandler = (e) => {
    setReportText(e.target.value);

    if (reportText.length < 5) {
      setTextValid(false);
      setTextFailMessage('내용은 5글자 이상 입력해주세요');
    } else if (reportText.length > 25) {
      setTextValid(false);
      setTextFailMessage('내용은 100글자 이하로 입력해주세요');
    } else {
      setTextValid(true);
    }
    setReportText(e.target.value);
  };

  return (
    <SReportModalContainer>
      <SReportModalBlock>
        <SReportModalHeader>
          <h1>신고하기</h1>
          <SReportModalClose onClick={reportModalHandler}>X</SReportModalClose>
        </SReportModalHeader>
        <div>
          <ReviewReason
            value={reportReason}
            reportReasonHandler={reportReasonHandler}
            className="review_reson"
          />
          {reasonValid ? (
            <></>
          ) : (
            <SFailMessage>{reasonFailMessage}</SFailMessage>
          )}
          <SReportText
            rows="50"
            cols="50"
            wrap="hard"
            placeholder="자세한 사유를 입력해 주세요"
            onChange={reportTextHandler}
          />
          {textValid ? <></> : <SFailMessage>{textFailMessage}</SFailMessage>}
          <SReportModalButtonBlock>
            <button onClick={reportModalHandler}>취 소</button>
            <button type="primary" onClick={showModal}>
              제 출
            </button>
          </SReportModalButtonBlock>
        </div>
      </SReportModalBlock>
      <Modal
        title="경고"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>신고를 접수하시겠습니까??</p>
      </Modal>
    </SReportModalContainer>
  );
};
export default ReportModal;
