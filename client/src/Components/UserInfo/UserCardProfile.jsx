import {
  UserCardProfileStyle,
  SName,
  SPicture,
  SUserInfo,
  SActivity,
  SLogOut,
  SUserDeleteModal,
} from '../../Style/UserCardProfileStyle';

import { BsPencilSquare } from 'react-icons/bs';
import { BiCommentDetail, BiCommentCheck } from 'react-icons/bi';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../../atoms/atoms';
import { useRecoilState } from 'recoil';
import Cookies from 'universal-cookie';
import axios from 'axios';

function UserCardProfile({ userInfo }) {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const LogOut = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedUserInfo');
    cookies.remove('refreshToken');
    setIsLogin(!isLogin);
    navigate('/home');
    window.scrollTo(0, 0);
  };
  const token = localStorage.getItem('accessToken');
  const ModalSubmit = async () => {
    setIsModalOpen(!isModalOpen);
    // MEMBER_STATUS - MEMBER_QUIT 으로 변경
    try {
      await axios({
        method: 'DELETE',
        url: '/members',
        headers: { Authorization: token },
      });
    } catch (error) {
      console.log('Error!');
      console.log(error);
    }
    LogOut();
  };
  const ModalClose = () => setIsModalOpen(!isModalOpen);

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '0';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isModalOpen]);

  return (
    <UserCardProfileStyle>
      <SName>
        <div
          className={
            userInfo?.doctor === true ? 'block doctor' : 'block member'
          }
        ></div>
        <h3 className="user-nick-name">
          {userInfo?.doctor === true ? userInfo?.name : userInfo?.displayName}
        </h3>
      </SName>
      <SPicture>
        <div className="frame">
          <img src="/images/user-icon.png" alt="user_picture" />
        </div>
      </SPicture>
      <SUserInfo>
        <div
          className={
            userInfo?.doctor === 'doctor' || userInfo?.doctor === true
              ? 'usertype doctor'
              : 'usertype member'
          }
        >
          {userInfo?.doctor ? 'Doctor' : 'Member'}
        </div>
        <div className="class">
          <strong>회원등급:</strong>&nbsp;
          {userInfo?.point < 100
            ? '일반'
            : userInfo?.point < 200
            ? '실버'
            : userInfo?.point >= 500
            ? '골드'
            : null}
        </div>
        <div className="sign-up">
          <strong>가입:</strong> {userInfo?.createdAt?.slice(0, 10)}
        </div>
        <SActivity>
          <div className="linetop"></div>
          <div className="user-activity">
            <div className="post">
              <span className="post-title">
                {userInfo?.doctor ? null : (
                  <>
                    <BsPencilSquare size={25} />
                    <span>게시글:</span>
                  </>
                )}
              </span>
              {userInfo?.doctor ? null : (
                <span>{userInfo?.postResponseMyPageInfos?.length} 개</span>
              )}
            </div>
            <div className="comment">
              <span className="post-title">
                <BiCommentDetail size={25} />
                <span>댓글:</span>
              </span>
              <span>{userInfo?.totalComments} 개</span>
            </div>
            <div className="adoptComment">
              <span className="post-title">
                <BiCommentCheck size={25} />
                <span>채택된 댓글:</span>
              </span>
              <span>{userInfo?.acceptComments} 개</span>
            </div>
          </div>
          <div className="linebottom"></div>
        </SActivity>
        <SLogOut>
          <button className="logout" onClick={LogOut}>
            Log Out
          </button>
          <button
            className="delete-user"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Delete User
          </button>
        </SLogOut>
        {isModalOpen ? (
          <SUserDeleteModal>
            <div className="modal">
              <div className="modal-content">
                <h2>회원 탈퇴</h2>
                <p>진행 하시겠습니까?</p>
                <button className="modal-submit-btn" onClick={ModalSubmit}>
                  확인
                </button>
                <button className="modal-close-btn" onClick={ModalClose}>
                  취소
                </button>
              </div>
            </div>
          </SUserDeleteModal>
        ) : null}
      </SUserInfo>
    </UserCardProfileStyle>
  );
}

export default UserCardProfile;
