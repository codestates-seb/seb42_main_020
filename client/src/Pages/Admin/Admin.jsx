import axios from 'axios';
import { useState } from 'react';
import PendingMemberItem from '../../Components/Admin/PendingMemberItem';
import PendingReviewItem from '../../Components/Admin/PendingReviewItem';
import {
  SMain,
  SLayout,
  STitle,
  SContent,
  SSubTitle,
  SSubText,
  SInput,
  SSubmitBtn,
  SCallBtn,
  SForm,
  SItemListSection,
  SContentSection,
  SCallBtnSection,
} from '../../Style/AdminStyle';

const Admin = () => {
  const [memberId, setMemberId] = useState('');
  const [postId, setPostId] = useState('');

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalContact, setHospitalContact] = useState('');
  const [hopitalAddress, setHospitalAddress] = useState('');

  const [pendingReviewList, setPendingReviewList] = useState({});
  const [pendingMemberList, setPendingMemberList] = useState({});

  const handleChangeDocRegi = (e) => {
    setMemberId(e.target.value);
  };

  const handleChangePost = (e) => {
    setPostId(e.target.value);
  };

  const handleChangeHospitalName = (e) => {
    setHospitalName(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeHospitalContact = (e) => {
    setHospitalContact(e.target.value);
  };

  const handleChangeHospitalAddress = (e) => {
    setHospitalAddress(e.target.value);
  };

  const handleDocRegiSubmit = async () => {
    try {
      const res = await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}/doctors/${memberId}/approval`,
      });
      console.log(res);
      if (res.status === 200) {
        // 승인 성공
      }
    } catch (error) {
      console.log('Error!', error);
    }
  };

  const handleReviewPostSubmit = async () => {
    try {
      const res = await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}/reviews/${postId}/approval`,
      });
      if (res.status === 200) {
        // 승인 성공
      }
    } catch (error) {
      console.log('Error!', error);
    }
  };

  const handleHospitalRegiSubmit = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/admin/hospital`,
        data: {
          name: hospitalName,
          phone: hospitalContact,
          address: hopitalAddress,
        },
      });
      if (res.status === 200) {
        // 승인 성공
      }
    } catch (error) {
      console.log('Error!', error);
    }
  };

  // /admin/members/8?hospitalName=율제병원
  const handleDocRegiToHospitalSubmit = async () => {
    try {
      const res = await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}/admin/members/${memberId}?hospitalName=${hospitalName}`,
      });
      if (res.status === 200) {
        // 승인 성공
      }
    } catch (error) {
      console.log('Error!', error);
    }
  };

  // /admin/posts/5?hospitalName=다나아정형외과
  const handlePostRegiToHospitalSubmit = async () => {
    try {
      const res = await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}/admin/posts/${postId}?hospitalName=${hospitalName}`,
      });
      if (res.status === 200) {
        // 승인 성공
      }
    } catch (error) {
      console.log('Error!', error);
    }
  };

  const handleClickMemLsit = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/admin`,
      headers: {
        'ngrok-skip-browser-warning': '69420',
      },
    }).then((res) => {
      setPendingReviewList(res.data);
      setPendingMemberList(res.data);
    });
  };

  return (
    <SMain>
      <SLayout>
        <STitle>관리자 승인 대기</STitle>
        <SContentSection>
          <div>
            <SContent>
              <SSubTitle>병원 등록</SSubTitle>
              <SSubText>
                등록 대기 중인 병원의 병원명, 연락처, 주소를 입력해 주세요
              </SSubText>
              <SForm>
                <SInput
                  onChange={handleChangeHospitalName}
                  placeholder="병원명"
                />
                <SInput
                  onChange={handleChangeHospitalContact}
                  placeholder="연락처"
                />
                <SInput
                  onChange={handleChangeHospitalAddress}
                  placeholder="주소"
                />
              </SForm>
              <SSubmitBtn onClick={handleHospitalRegiSubmit}>승인</SSubmitBtn>
            </SContent>
            <SContent>
              <SSubTitle>병원에 의사 회원 등록</SSubTitle>
              <SSubText>등록되어 있는 병원에 의사 회원을 등록합니다.</SSubText>
              <SForm>
                <SInput
                  onChange={handleChangeHospitalName}
                  placeholder="병원명"
                />
                <SInput
                  onChange={handleChangeDocRegi}
                  placeholder="의사 회원 Id"
                />
              </SForm>
              <SSubmitBtn onClick={handleDocRegiToHospitalSubmit}>
                승인
              </SSubmitBtn>
            </SContent>
            <SContent>
              <SSubTitle>병원에 리뷰 게시글 등록</SSubTitle>
              <SSubText>
                등록되어 있는 병원에 리뷰 게시글을 등록합니다.
              </SSubText>
              <SForm>
                <SInput
                  onChange={handleChangeHospitalName}
                  placeholder="병원명"
                />
                <SInput onChange={handleChangePost} placeholder="post-id" />
              </SForm>
              <SSubmitBtn onClick={handlePostRegiToHospitalSubmit}>
                승인
              </SSubmitBtn>
            </SContent>
            <SContent>
              <SSubTitle>의사 회원가입 승인</SSubTitle>
              <SSubText>승인 대기 중인 멤버의 ID를 입력해 주세요</SSubText>
              <SForm>
                <SInput
                  onChange={handleChangeDocRegi}
                  placeholder="member-id"
                />
              </SForm>
              <SSubmitBtn onClick={handleDocRegiSubmit}>승인</SSubmitBtn>
            </SContent>
            <SContent>
              <SSubTitle>리뷰 포스트 등록 승인</SSubTitle>
              <SSubText>
                승인 대기 중인 리뷰 게시물의 ID를 입력해 주세요
              </SSubText>
              <SForm>
                <SInput onChange={handleChangePost} placeholder="post-id" />
              </SForm>
              <SSubmitBtn onClick={handleReviewPostSubmit}>승인</SSubmitBtn>
            </SContent>
          </div>
          <SItemListSection>
            <SCallBtnSection>
              <SCallBtn onClick={handleClickMemLsit}>
                승인 대기 리스트 불러오기
              </SCallBtn>
            </SCallBtnSection>
            <PendingMemberItem pendingMemberList={pendingMemberList} />
            <PendingReviewItem pendingReviewList={pendingReviewList} />
          </SItemListSection>
        </SContentSection>
      </SLayout>
    </SMain>
  );
};

export default Admin;
