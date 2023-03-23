import EditUserInfo from './EditUserInfo';
import {
  UserMainProfileStyle,
  STitle,
  SInfo,
  SMyPost,
} from '../../Style/UserMainProfileStyle';
import UserPost from './UserPost';
import MakeContents from '../MakeContents/MakeContents';
import styled from 'styled-components';

import { FiEdit } from 'react-icons/fi';
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
            <span className="type">
              {userInfo?.doctor === true ? 'Hospital' : 'Nickname'}
            </span>
            <span className="value">
              {userInfo?.doctor === true
                ? userInfo?.hospitalName
                : userInfo?.displayName}
            </span>
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
        <div className="picture">
          <img src="/images/care.png" alt="pill-img"></img>
        </div>
      </SInfo>
      {userInfo?.doctor === true ? (
        <CommingSoon>
          <span>Comming Soon!</span>
        </CommingSoon>
      ) : (
        <>
          <SMyPost>
            <div className="my-post">
              <h3>나의 게시글</h3>
              <MakeContents />
            </div>
            <div className="line"></div>
          </SMyPost>
          <UserPost />
        </>
      )}
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

const CommingSoon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 80px;
  font-weight: bold;
  color: #d6d6d6;
`;

export default UserMainProfile;
