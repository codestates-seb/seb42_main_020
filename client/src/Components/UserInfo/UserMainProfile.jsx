import EditUserInfo from './EditUserInfo';
import {
  UserMainProfileStyle,
  STitle,
  SInfo,
  SMyPost,
} from '../../Style/UserMainProfileStyle';
import UserPost from './UserPost';

import { FiEdit } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { CiMemoPad } from 'react-icons/ci';
import { useState } from 'react';

function UserMainProfile({ userInfo }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <UserMainProfileStyle>
      <STitle>
        <div className="title">
          <CiMemoPad />
          <h2>User Information</h2>
        </div>
        <button className="edit-profile" onClick={handleModal}>
          <FiEdit size={25} color="#00663b" />
          <span>Edit Profile</span>
        </button>
      </STitle>
      <SInfo>
        <ul className="info">
          <li className="user-id">
            <span className="type">User ID</span>
            <span className="value">{userInfo?.email}</span>
          </li>
          <li className="nickname">
            <span className="type">Nickname</span>
            <span className="value">{userInfo?.displayName}</span>
          </li>
          <li className="name">
            <span className="type">Name</span>
            <span className="value">{userInfo?.name}</span>
          </li>
          <li className="area">
            <span className="type">Area</span>
            <span className="value">None</span>
          </li>
        </ul>
        <ul className="sns">
          <li className="google">
            <FcGoogle size={25} />
            <span className="sns-value">None</span>
          </li>
          <li className="facebook">
            <BsFacebook size={25} />
            <span className="sns-value">None</span>
          </li>
          <li className="naver">
            <SiNaver size={25} />
            <span className="sns-value">None</span>
          </li>
          <li className="kakao">
            <RiKakaoTalkFill size={25} />
            <span className="sns-value">None</span>
          </li>
        </ul>
        <div className="picture">
          <img src="/images/care.png" alt="pill-img"></img>
        </div>
      </SInfo>
      <SMyPost>
        <div className="my-post">
          <h3>나의 게시글</h3>
          <button className="create-post">글쓰기</button>
        </div>
        <div className="line"></div>
      </SMyPost>
      <UserPost />
      {isOpenModal ? (
        <EditUserInfo
          handleModal={handleModal}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      ) : (
        <></>
      )}
    </UserMainProfileStyle>
  );
}

export default UserMainProfile;
