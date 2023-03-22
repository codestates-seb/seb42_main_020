import axios from 'axios';
import { useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import styled from 'styled-components';
import {
  getRefreshTokenToCookie,
  setAccessTokenToLocal,
} from '../../util/Token';

const SModalLayout = styled.div`
  background-color: rgb(0 0 0 / 30%);
  position: fixed;
  top: 0;
  right: 0;
  width: 100% !important;
  height: 100%;
`;

const SModal = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  position: fixed;
  width: 900px;
  height: 400px;
  top: 200px;
  left: 510px;
  background-color: var(--white);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 30px;
  position: relative;
  svg {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 23px;
    color: var(--gray-800);
    text-align: right;
    cursor: pointer;
  }
`;

const STitle = styled.h1`
  font-family: 'TheJamsil5Bold';
  font-size: 32px;
  color: var(--gray-800);
  margin: 30px 0;
  text-align: center;
`;

const SFormSection = styled.div`
  width: 895px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    font-weight: 500;
    font-size: 16px;
  }
`;

const SInputSection = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-300);
`;

const SInput = styled.input`
  width: 335px;
  height: 45px;
  margin: 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SSubmitBtn = styled.button`
  width: 200px;
  height: 40px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-200);
  border: 1px solid var(--blue-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 3px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: var(--black);
  }
  :hover {
    background-color: var(--blue-300);
    border: 1px solid var(--blue-300);
  }
`;

const EditUserInfo = ({ handleModal, isOpenModal, setIsOpenModal }) => {
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('');

  const refreshToken = getRefreshTokenToCookie('refreshToken');
  const token = localStorage.getItem('accessToken');

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
      if (error.code === 'This is expired token!') {
        console.log('에러 코드 일치');
        // 리프레시 토큰 사용 , 엑세스 토큰 재발급 요청
        try {
          const res = await axios({
            method: 'post',
            url: '/auth/refresh',
            headers: { Refresh: refreshToken },
          });
          // 엑세스 토큰 재발급 받은 것으로 변경
          const newAccessToken = res.headers.authorization;
          setAccessTokenToLocal(newAccessToken);
        } catch (error) {
          console.log(error);
        }
      }
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
  );
};

export default EditUserInfo;
