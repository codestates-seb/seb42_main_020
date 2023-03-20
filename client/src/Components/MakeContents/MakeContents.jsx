import { useState } from 'react';
import {
  SModal,
  SPostModalBlock,
  SModalWrapper,
} from '../../Style/MakeContentStyle';
import { useNavigate } from 'react-router-dom';

const MakeContents = () => {
  const navigate = useNavigate();

  const [openMake, setOpenMake] = useState(false);
  // 모달 창 상태 관리
  const modalHandler = () => {
    setOpenMake((prev) => !prev);
  };
  // 리뷰 클릭시 리뷰 페이지로 이동
  const reviewClickHandler = () => {
    setOpenMake((prev) => !prev);
    navigate('/review');
  };

  const questionClickHandler = () => {
    setOpenMake((prev) => !prev);
    navigate('/askquestion');
  };

  return (
    <div className="modal_wrapper">
      <SPostModalBlock>
        <button onClick={modalHandler}>리뷰 / 질문 작성하기</button>
        {openMake && (
          <SModalWrapper>
            <SModal>
              <div>
                <button onClick={reviewClickHandler}>리뷰 작성하기</button>
                <button onClick={questionClickHandler}>질문 작성하기</button>
              </div>
              <button onClick={modalHandler}>닫 기</button>
            </SModal>
          </SModalWrapper>
        )}
      </SPostModalBlock>
    </div>
  );
};

export default MakeContents;
