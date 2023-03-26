import axios from 'axios';
import { useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { getAccessTokenFromLocal } from '../../util/Token';

import {
  SModalLayout,
  SModal,
  STitle,
  SFormSection,
  SInputSection,
  SInput,
  SSubmitBtn,
  Success,
} from '../../Style/EditUserInfo';

const EditUserInfo = ({ handleModal, isOpenModal, setIsOpenModal }) => {
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('');

  const token = getAccessTokenFromLocal();

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        '/members',
        {
          displayName,
          password,
          area,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (res.status === 200) {
        // 모달창 닫힘
        setIsOpenModal(!isOpenModal);
        // 성공 안내 창 띄우기 TBA
      }
    } catch (error) {
      // 실패 안내창 띄우기
    }
  };

  // 닉네임
  const handleChangeNickname = (e) => {
    const currNickname = e.target.value;
    setDisplayName(currNickname);
  };

  // 비밀번호
  const handleChangePassword = (e) => {
    const currPassword = e.target.value;
    setPassword(currPassword);
  };

  // 지역
  const handleChangeArea = (e) => {
    const currArea = e.target.value;
    setArea(currArea);
  };

  return (
    <>
      <SModalLayout>
        <SModal>
          <BsArrowReturnLeft onClick={handleModal} />
          <STitle>회원 정보 수정</STitle>
          <SFormSection>
            <SInputSection>
              <SInput onChange={handleChangeNickname} placeholder="닉네임" />
              <SInput
                type="password"
                onChange={handleChangePassword}
                placeholder="비밀번호"
              />
              <SInput onChange={handleChangeArea} placeholder="활동지역" />
            </SInputSection>
            <SSubmitBtn type="submit" onClick={handleSubmit}>
              수정
            </SSubmitBtn>
          </SFormSection>
        </SModal>
      </SModalLayout>
      <Success>
        <div>dd</div>
      </Success>
    </>
  );
};

export default EditUserInfo;
