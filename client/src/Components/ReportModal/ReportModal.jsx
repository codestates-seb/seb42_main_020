import { useState } from 'react';
import {
  SReportModalContainer,
  SReportModalBlock,
  SReportModalHeader,
  SReportText,
  SReportModalButtonBlock,
  SReportModalClose,
} from '../../Style/ReportModalStyle';

const ReportModal = ({ reportModalHandler, setReportModal }) => {
  //모달 제출 내용
  const [reportText, setReportText] = useState('');

  // 모달 제출
  const reportTextHandler = (e) => {
    setReportText(e.target.value);
  };

  const reportSubmitHandler = () => {
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
