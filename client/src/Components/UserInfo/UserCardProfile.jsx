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

function UserCardProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const ModalSubmit = () => {
    setIsModalOpen(!isModalOpen);
    navigate('/');
    window.scrollTo(0, 0);
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
        <div className="block"></div>
        <h3 className="user-nick-name">개발새발자</h3>
      </SName>
      <SPicture>
        <div className="frame">
          <img src="/images/user-icon.png" alt="user_picture" />
        </div>
      </SPicture>
      <SUserInfo>
        <div className="usertype">Member</div>
        <div className="class">
          <strong>회원등급:</strong> 일반
        </div>
        <div className="sign-up">
          <strong>가입:</strong> 2023년 3월 13일
        </div>
        <SActivity>
          <div className="linetop"></div>
          <div className="user-activity">
            <div className="post">
              <span className="post-title">
                <BsPencilSquare size={25} />
                <span>게시글:</span>
              </span>
              <span>11 개</span>
            </div>
            <div className="comment">
              <span className="post-title">
                <BiCommentDetail size={25} />
                <span>댓글:</span>
              </span>
              <span>483 개</span>
            </div>
            <div className="adoptComment">
              <span className="post-title">
                <BiCommentCheck size={25} />
                <span>채택된 댓글:</span>
              </span>
              <span>18 개</span>
            </div>
          </div>
          <div className="linebottom"></div>
        </SActivity>
        <SLogOut>
          <button className="logout">Log Out</button>
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
