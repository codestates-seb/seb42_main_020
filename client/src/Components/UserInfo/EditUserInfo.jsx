import axios from 'axios';
import { useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

const EditUserInfo = ({ handleModal, isOpenModal, setIsOpenModal }) => {
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('');

  const refreshToken = getRefreshTokenToCookie('refreshToken');
  console.log(refreshToken);
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
      console.log(error.response.statusText);

      if (error.response.statusText === 'Unauthorized') {
        console.log('에러 코드 일치');
        // 리프레시 토큰 사용 , 엑세스 토큰 재발급 요청
        try {
          const sndRes = await axios.post('/auth/refresh', null, {
            headers: { Refresh: refreshToken },
          });
          console.log(sndRes);
          // 엑세스 토큰 재발급 받은 것으로 변경
          const newAccessToken = sndRes.headers.authorization;
          setAccessTokenToLocal(newAccessToken);
        } catch (error) {
          console.log(error);
        }
      }
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
