import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const SMain = styled.main`
  width: 1920px;
  height: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--blue-50);
`;

const SLayout = styled.div`
  width: 1500px;
  height: 800px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  box-shadow: 0 10px 3px 0 var(--gray-200);
  border-radius: 30px;
  padding: 50px;
`;

const STitle = styled.h1`
  font-family: 'TheJamsil5Bold';
  font-size: 32px;
  color: var(--gray-800);
  margin-bottom: 10px;
`;

const SContent = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SSubTitle = styled.h2`
  font-family: 'TheJamsil5Bold';
  font-size: 25px;
  margin-bottom: 10px;
  color: var(--gray-800);
  margin-bottom: 13px;
`;

const SSubText = styled.h3`
  font-size: 17px;
  margin-bottom: 13px;
`;

const SInput = styled.input`
  width: 200px;
  height: 40px;
  margin: 10px 10px 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SSubmitBtn = styled.button`
  width: 120px;
  height: 40px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 3px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  :hover {
    background-color: var(--blue-300);
    border: 1px solid var(--blue-300);
  }
`;

const SForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Admin = () => {
  const [memberId, setMemberId] = useState('');
  const [postId, setPostId] = useState('');
  const [isDoneForDoc, setIsDoneForDoc] = useState(false);
  const [isDoneForPost, setIsDonePost] = useState(false);

  const handleChangeDocRegi = (e) => {
    setMemberId(e.target.value);
  };

  const handleChangePost = (e) => {
    setPostId(e.target.value);
  };

  const handleDocRegiSubmit = async () => {
    try {
      const res = await axios({
        method: 'patch',
        url: `/doctors/${memberId}/approval`,
      });
      console.log(res);
      if (res.status === 200) {
        // 승인 성공
        setIsDoneForDoc(!isDoneForDoc);
      }
    } catch (error) {
      console.log('Error!', error);
    }
  };

  const handleReviewPostSubmit = async () => {
    try {
      const res = await axios({
        method: 'patch',
        url: `/reviews/${postId}/approval`,
      });
      if (res.status === 200) {
        // 승인 성공
        setIsDonePost(!isDoneForPost);
      }
    } catch (error) {
      console.log('Error!', error);
    }
  };

  return (
    <SMain>
      <SLayout>
        <STitle>관리자 승인 대기</STitle>
        <SContent>
          <SSubTitle>의사 회원가입 승인</SSubTitle>
          <SSubText>승인 대기 중인 멤버의 ID를 입력해 주세요</SSubText>
          <SForm>
            <SInput onChange={handleChangeDocRegi} placeholder="member-id" />
            <SSubmitBtn onClick={handleDocRegiSubmit}>승인</SSubmitBtn>
          </SForm>
          {isDoneForDoc ? <SSubText>승인이 완료되었습니다.</SSubText> : <></>}
        </SContent>
        <SContent>
          <SSubTitle>리뷰 포스트 등록 승인</SSubTitle>
          <SSubText>승인 대기 중인 리뷰 게시물의 ID를 입력해 주세요</SSubText>
          <SForm>
            <SInput onChange={handleChangePost} placeholder="post-id" />
            <SSubmitBtn onClick={handleReviewPostSubmit}>승인</SSubmitBtn>
          </SForm>
          {isDoneForPost ? <SSubText>승인이 완료되었습니다.</SSubText> : <></>}
        </SContent>
      </SLayout>
    </SMain>
  );
};

export default Admin;
