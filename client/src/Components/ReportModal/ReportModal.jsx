import { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewReason from './ReviewReason';
import {
  SReportModalContainer,
  SReportModalBlock,
  SReportModalHeader,
  SReportText,
  SReportModalButtonBlock,
  SReportModalClose,
} from '../../Style/ReportModalStyle';

const ReportModal = ({ reportModalHandler, setReportModal, reviewData }) => {
  const token = localStorage.getItem('accessToken');

  //모달 제출 내용
  const [reportText, setReportText] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportInfo, setReportInfo] = useState({});

  useEffect(() => {
    setReportInfo({
      reason: reportReason,
      content: reportText,
    });
  }, [reportReason, reportText]);

  // 신고 사유
  const reportReasonHandler = (e) => {
    setReportReason(e.target.value);
  };
  // 신고 내용
  const reportTextHandler = (e) => {
    setReportText(e.target.value);
  };

  const reportSubmitHandler = () => {
    axios.defaults.baseURL = 'http://localhost:3000';
    axios
      .post(`posts/${reviewData.postId}/report`, reportInfo, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
    alert('신고가 접수되었습니다.');
    setReportModal((prev) => !prev);
    console.log(reportText);
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
            onChange={reportReasonHandler}
            className="review_reson"
          />
          <SReportText
            rows="50"
            cols="50"
            wrap="hard"
            placeholder="신고 사유를 입력해 주세요"
            onChange={reportTextHandler}
          />
          <SReportModalButtonBlock>
            <button onClick={reportModalHandler}>취 소</button>
            <button onClick={reportSubmitHandler}>제 출</button>
          </SReportModalButtonBlock>
        </div>
      </SReportModalBlock>
    </SReportModalContainer>
  );
};
export default ReportModal;
