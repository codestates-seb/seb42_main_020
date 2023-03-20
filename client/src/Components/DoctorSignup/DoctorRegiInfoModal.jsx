import { Link } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs';
import {
  SModalLayout,
  SModal,
  DoctorRegiInfo,
} from '../../Style/DoctorSignupStyle';

export const DoctorRegiInfoModal = () => {
  return (
    <SModalLayout>
      <SModal>
        <Link to="/">
          <BsArrowReturnLeft />
        </Link>
        <DoctorRegiInfo>
          <h1>회원 가입 요청이 성공적으로 완료 되었습니다</h1>
          <h2>
            인증 시 입력하신 정보는 필요한 경우 사전 동의를 거쳐 안전하게
            DB화되어 보관 됩니다.
          </h2>
          <h3>
            회원가입 시 1회만 인증이 필요하며 인증 소요시간은
            <br /> 평일 기준 9:00 ~ 17:30 사이 당일 내 처리 됨을 알려 드립니다
          </h3>
        </DoctorRegiInfo>
      </SModal>
    </SModalLayout>
  );
};

export const DoctorRegiPolicyModal = ({ handleClose }) => {
  return (
    <SModalLayout>
      <SModal>
        <BsArrowReturnLeft onClick={handleClose} />
        <DoctorRegiInfo>안내 이미지 예정</DoctorRegiInfo>
      </SModal>
    </SModalLayout>
  );
};
