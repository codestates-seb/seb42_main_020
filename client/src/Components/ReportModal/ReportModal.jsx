import { useEffect, useState } from 'react';
import ReviewReason from './ReviewReason';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, Modal } from 'antd';
import {
  SReportModalContainer,
  SReportModalBlock,
  SReportModalHeader,
  SReportText,
  SReportModalButtonBlock,
  SReportModalClose,
  SFailMessage,
} from '../../Style/ReportModalStyle';

const ReportModal = ({ reportModalHandler }) => {
  //토큰
  const token = localStorage.getItem('accessToken');

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

  const showModal = () => {
    if (reasonValid && textValid) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };
  const handleOk = () => {
    if (textValid && reasonValid) {
      axios.defaults.baseURL = 'http://localhost:3000';
      axios
        .post(`posts/2/report`, reportInfo, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
      setIsModalOpen(false);
      navigate('/question/1234');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setReportInfo({
      reason: reportReason,
      content: reportText,
    });
  }, [reportReason, reportText]);

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
            reportReason={reportReason}
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
            <Button type="primary" onClick={showModal}>
              제 출
            </Button>
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
