import { useState } from 'react';
import { Modal, Wrapper, ModalWrapper } from '../../Style/MakeContentStyle';
import { useNavigate } from 'react-router-dom';

const ModalTest = () => {
  const navigate = useNavigate();

  const [isTrue, setIsTrue] = useState(false);
  // 모달 창 상태 관리
  const modalHandler = () => {
    setIsTrue((prev) => !prev);
  };
  // 리뷰 클릭시 리뷰 페이지로 이동
  const reviewClickHandler = () => {
    setIsTrue((prev) => !prev);
    navigate('/review');
  };

  const questionClickHandler = () => {
    setIsTrue((prev) => !prev);
    navigate('/');
  };

  return (
    <div className="modal_wrapper">
      <Wrapper>
        <button onClick={modalHandler}>리뷰 / 질문 작성하기</button>
        {isTrue && (
          <ModalWrapper>
            <Modal>
              <div>
                <button onClick={reviewClickHandler}>리뷰 작성하기</button>
                <button onClick={questionClickHandler}>질문 작성하기</button>
              </div>
              <button onClick={modalHandler}>닫 기</button>
            </Modal>
          </ModalWrapper>
        )}
      </Wrapper>
    </div>
  );
};

export default ModalTest;
