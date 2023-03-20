import { useEffect, useState } from 'react';
import ReviewReason from './ReviewReason';
import AlertCommentModal from '../AlertModal/AlertCommentModal';
import {
  SReportModalContainer,
  SReportModalBlock,
  SReportModalHeader,
  SReportText,
  SReportModalButtonBlock,
  SReportModalClose,
} from '../../Style/ReportModalStyle';

const ReportCommentModal = ({ reportModalHandler, ele }) => {
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
    console.log(e);
    setReportReason(e);
  };
  // 신고 내용
  const reportTextHandler = (e) => {
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
          <SReportText
            rows="50"
            cols="50"
            wrap="hard"
            placeholder="신고 사유를 입력해 주세요"
            onChange={reportTextHandler}
          />
          <SReportModalButtonBlock>
            <button onClick={reportModalHandler}>취 소</button>
            <AlertCommentModal reportInfo={reportInfo} ele={ele}>
              제 출
            </AlertCommentModal>
          </SReportModalButtonBlock>
        </div>
      </SReportModalBlock>
    </SReportModalContainer>
  );
};
export default ReportCommentModal;
