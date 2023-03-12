import { SModalBlock, SModalClose } from '../../Style/ReviewModalStlye';

function WaitModal({ closeModal }) {
  // 모달 끄기

  return (
    <SModalBlock>
      <SModalClose onClick={closeModal}>X</SModalClose>
      <p>승인 대기중 입니다..</p>
    </SModalBlock>
  );
}
export default WaitModal;
